import SortView from '../view/sort-view.js';
import ContainerListView from '../view/container-list-view.js';
import PointPresenter from './point-presenter.js';
import RouteView from '../view/route-view.js';
import NoEventView from '../view/no-event-view.js';
import { RenderPosition, render} from '../framework/render.js';
import {updateItem} from '../utils/common.js';
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

  constructor({sortContainer, listContainer, routeContainer, tripModel}) {
    this.#sortContainer = sortContainer;
    this.#listContainer = listContainer;
    this.#routeContainer = routeContainer;
    this.#tripModel = tripModel;
  }

  init() {
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
    this.#pointPresenters.get(updatedTask.id).init(updatedTask);
  };

  #clearTaskList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    this.#renderedTaskCount = TASK_COUNT_PER_STEP;
  }
  #handleSortTypeChange = (sortType) => {
    // - Сортируем задачи
    // - Очищаем список
    // - Рендерим список заново
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
