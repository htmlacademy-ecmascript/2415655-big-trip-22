import SortView from '../view/sort-view.js';
import ContainerListView from '../view/container-list-view.js';
import PointPresenter from './point-presenter.js';
import RouteView from '../view/route-view.js';
import NoEventView from '../view/no-event-view.js';
import {RenderPosition, render} from '../framework/render.js';
import {updateItem} from '../utils/common.js';
import {sortDate, sortPrice} from '../utils/event.js';
import {SortType} from '../const.js';
//Форма по дефолту
//import { getDefaultPoint } from '../const.js';
const TASK_COUNT_PER_STEP = 4;
export default class BoardPresenter {
  #sortContainer = null;
  #listContainer = null;
  #routeContainer = null;
  #tripModel = null;
  #renderedTaskCount = TASK_COUNT_PER_STEP;

  #containerComponent = new ContainerListView();
  #sortComponent = null;
  #routComponent = new RouteView();

  #pointPresenters = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourcedBoardPoints = [];
  #boardPoints = [];

  constructor({sortContainer, listContainer, routeContainer, tripModel}) {
    this.#sortContainer = sortContainer;
    this.#listContainer = listContainer;
    this.#routeContainer = routeContainer;
    this.#tripModel = tripModel;
  }

  get tasks() {
    return this.#tripModel.points;
  }

  init() {
    this.#boardPoints = [...this.#tripModel.points];
    this.#sourcedBoardPoints = [...this.#tripModel.points];
    this.#renderRoute();
    this.#renderSort();
    this.#renderPointsContainer();
    this.#renderPoints();
  }

  #renderTrip(point, destinations, offers) {
    const pointPresenter = new PointPresenter({
      containerComponent: this.#containerComponent.element,
      onDataChange: this.#handleTaskChange,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point, destinations, offers);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };


  #handleTaskChange = (updatedPoint) => {
    this.#containerComponent = updateItem(this.#boardPoints, updatedPoint);
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #sortPoints = (sortType) => {
    // 2. Этот исходный массив задач необходим,
    // потому что для сортировки мы будем мутировать
    // массив в свойстве _boardTasks
    switch (sortType) {
      case SortType.DAY:
        this.#boardPoints.sort(sortDate);
        break;
      case SortType.PRICE:
        this.#boardPoints.sort(sortPrice);
        break;
      default:
        // 3. А когда пользователь захочет "вернуть всё, как было",
        // мы просто запишем в _boardTasks исходный массив
        this.#boardPoints = [...this.#sourcedBoardPoints];
    }
    this.#currentSortType = sortType;
  };

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    this.#renderedTaskCount = TASK_COUNT_PER_STEP;
  }

  #handleSortTypeChange = (sortType) => {
    if(sortType === this.#currentSortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPoints();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#sortContainer);
  }

  #renderRoute() {
    render(this.#routComponent, this.#routeContainer, RenderPosition.AFTERBEGIN);
  }

  #renderPointsContainer() {
    render(this.#containerComponent, this.#listContainer);
  }

  #renderPoints() {
    const offers = this.#tripModel.offers;
    const destinations = this.#tripModel.destinations;
    const points = this.#tripModel.points;

    //Форма по дефолту
    //render(new EditPointView(getDefaultPoint(), destinations, offers), this.#addListComponent.element);

    if (points.length === 0) {
      render(new NoEventView(), this.#sortContainer);
      return;
    }

    this.#boardPoints.forEach((point) => {
      this.#renderTrip(point, destinations, offers);
    });
  }
}
