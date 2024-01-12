import SortView from '../view/sort-view.js';
import ContainerListView from '../view/container-list-view.js';
import PointPresenter from './point-presenter.js';
import RouteView from '../view/route-view.js';
import NoEventView from '../view/no-event-view.js';
import { RenderPosition, render} from '../framework/render.js';
import {updateItem} from '../utils/common.js';
import {sortTaskUp, sortTaskDown} from '../utils/event.js';
import {SortType} from '../const.js';
//Форма по дефолту
//import { getDefaultPoint } from '../const.js';
const TASK_COUNT_PER_STEP = 8;
export default class BoardPresenter {
  #sortContainer = null;
  #listContainer = null;
  #routeContainer = null;
  #tripModel = null;
  #renderedTaskCount = TASK_COUNT_PER_STEP;

  #containerComponent = new ContainerListView();

  // #sortComponent = new SortView();
  #sortComponent = null;
  #routComponent = new RouteView();

  #pointPresenters = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourcedBoardTasks = [];
  #boardTasks = [];

  constructor({sortContainer, listContainer, routeContainer, tripModel}) {
    this.#sortContainer = sortContainer;
    this.#listContainer = listContainer;
    this.#routeContainer = routeContainer;
    this.#tripModel = tripModel;
  }

  init() {
    this.#boardTasks = [...this.#tripModel.points];
    this.#sourcedBoardTasks = [...this.#tripModel.points];

    this.#renderApp();
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


  #handleTaskChange = (updatedTask) => {
    this.#containerComponent = updateItem(this.#containerComponent, updatedTask);
    this.#sourcedBoardTasks = updateItem(this.#sourcedBoardTasks, updatedTask);
    this.#pointPresenters.get(updatedTask.id).init(updatedTask);
  };

  #sortTasks(sortType) {
    // 2. Этот исходный массив задач необходим,
    // потому что для сортировки мы будем мутировать
    // массив в свойстве _boardTasks
    switch (sortType) {
      case SortType.DATE_UP:
        this.#boardTasks.sort(sortTaskUp);
        break;
      case SortType.DATE_DOWN:
        this.#boardTasks.sort(sortTaskDown);
        break;
      default:
        // 3. А когда пользователь захочет "вернуть всё, как было",
        // мы просто запишем в _boardTasks исходный массив
        this.#boardTasks = [...this.#sourcedBoardTasks];
    }

    this.#currentSortType = sortType;
  }


  #clearTaskList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    this.#renderedTaskCount = TASK_COUNT_PER_STEP;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortTasks(sortType);
    this.#clearTaskList();
    this.#renderTrip();
  };

  #renderApp() {
    const offers = this.#tripModel.offers;
    const destinations = this.#tripModel.destinations;
    const points = this.#tripModel.points;

    render(this.#routComponent, this.#routeContainer, RenderPosition.AFTERBEGIN);

    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#sortContainer);
    render(this.#containerComponent, this.#listContainer);
    //Форма по дефолту
    //render(new EditPointView(getDefaultPoint(), destinations, offers), this.#addListComponent.element);

    if (points.length === 0) {
      render(new NoEventView(), this.#sortContainer);
      return;
    }

    for (const point of points) {
      this.#renderTrip(point, destinations, offers);
    }
  }
}
