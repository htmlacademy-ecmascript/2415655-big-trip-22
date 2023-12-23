import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import PointView from '../view/point-view.js';
import ContainerListView from '../view/container-list-view.js';
import EditPointView from '../view/edit-point-view.js';
import RouteView from '../view/route-view.js';
import {render,RenderPosition} from '../render.js';
import { getDefaultPoint } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class BoardPresenter extends AbstractView {
  #filterContainer = null;
  #sortContainer = null;
  #listContainer = null;
  #routeContainer = null;
  #tripModel = null;

  #addListComponent = new ContainerListView();

  #sortComponent = new SortView();
  #filterComponent = new FilterView();
  #editComponent = new EditPointView();
  #addPointComponent = new PointView();
  #routComponent = new RouteView();

  #boardTrip = [];


  constructor(filterContainer, sortContainer, listContainer, routeContainer, tripModel) {
    super();
    this.#filterContainer = filterContainer;
    this.#sortContainer = sortContainer;
    this.#listContainer = listContainer;
    this.#routeContainer = routeContainer;
    this.#tripModel = tripModel;
  }

  init() {
    const offers = this.#tripModel.offers;
    const destinations = this.#tripModel.destinations;
    const points = this.#tripModel.points;

    render(this.#routComponent, this.#routeContainer, RenderPosition.AFTERBEGIN);
    render(this.#sortComponent, this.#sortContainer);
    render(this.#filterComponent, this.#filterContainer);
    render(this.#addListComponent, this.#listContainer);
    render(new EditPointView(getDefaultPoint(), destinations, offers), this.#addListComponent.element());
    render(new EditPointView(points[0], destinations, offers), this.#addListComponent.element());

    for (const point of points) {
      this.#renderTrip(point, destinations, offers);
    }
  }

  #renderTrip(trip) {
    const tripComponent = new PointView(trip);

    render(tripComponent, this.#addListComponent.element);
  }
}
