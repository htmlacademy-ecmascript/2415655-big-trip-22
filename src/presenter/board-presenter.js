import SortView from '../view/sort-view.js';
import ContainerListView from '../view/container-list-view.js';
import PointPresenter from './point-presenter.js';
import RouteView from '../view/route-view.js';
import NoEventView from '../view/no-event-view.js';
import {RenderPosition, render, remove} from '../framework/render.js';
import {sortDate, sortPrice} from '../utils/event.js';
import {SortType, UpdateType, UserAction} from '../const.js';
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



  constructor({sortContainer, listContainer, routeContainer, tripModel}) {
    this.#sortContainer = sortContainer;
    this.#listContainer = listContainer;
    this.#routeContainer = routeContainer;
    this.#tripModel = tripModel;

    this.#tripModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.DATE_UP:
        return [...this.#tripModel.points].sort(sortDate);
      case SortType.DATE_DOWN:
        return [...this.#tripModel.points].sort(sortDate);
    }
    return this.#tripModel.points;
  }

  init() {
    this.#renderRoute();
    this.#renderSort();
    this.#renderPointsContainer();
    this.#renderPoints();
  }

  #renderTrip(point, destinations, offers) {
    const pointPresenter = new PointPresenter({
      containerComponent: this.#containerComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point, destinations, offers);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };


  #handleViewAction = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#tripModel.updateTask(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#tripModel.addTask(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#tripModel.deleteTask(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderTrip();
        // - обновить список (например, когда задача ушла в архив)
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetRenderedTaskCount: true, resetSortType: true});
        this.#renderTrip();
        // - обновить всю доску (например, при переключении фильтра)
        break;
    }
  };

  #clearBoard({resetRenderedTaskCount = false, resetSortType = false} = {}) {
    const taskCount = this.points.length;

    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);


    if (resetRenderedTaskCount) {
      this.#renderedTaskCount = TASK_COUNT_PER_STEP;
    } else {
      // На случай, если перерисовка доски вызвана
      // уменьшением количества задач (например, удаление или перенос в архив)
      // нужно скорректировать число показанных задач
      this.#renderedTaskCount = Math.min(taskCount, this.#renderedTaskCount);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }



  #handleSortTypeChange = (sortType) => {
    if(sortType === this.#currentSortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard({resetRenderedTaskCount: true});
    this.#renderTrip();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
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

  // #renderTasks(tasks) {
  //   tasks.forEach((task) => this.#renderTask(task));
  // }

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

    points.forEach((point) => {
      this.#renderTrip(point, destinations, offers);
    });
  }
}
