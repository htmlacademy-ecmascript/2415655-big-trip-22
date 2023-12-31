import SortView from '../view/sort-view.js';
import PointView from '../view/point-view.js';
import ContainerListView from '../view/container-list-view.js';
import EditPointView from '../view/edit-point-view.js';
import RouteView from '../view/route-view.js';
import NoEventView from '../view/no-event-view.js';
import { RenderPosition, render, replace } from '../framework/render.js';
//import { getDefaultPoint } from '../const.js';
export default class BoardPresenter {
  #sortContainer = null;
  #listContainer = null;
  #routeContainer = null;
  #tripModel = null;

  #addListComponent = new ContainerListView();

  #sortComponent = new SortView();
  #routComponent = new RouteView();

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
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const tripComponent = new PointView({
      point,
      destinations,
      offers,
      onEditClick: () => {
        replaceCardToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const tripEditComponent = new EditPointView({
      point,
      destinations,
      offers,
      onFormClick: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replaceCardToForm() {
      replace(tripEditComponent, tripComponent);
    }

    function replaceFormToCard() {
      replace(tripComponent, tripEditComponent);
    }

    render(tripComponent, this.#addListComponent.element);

  }

  #renderApp() {
    const offers = this.#tripModel.offers;
    const destinations = this.#tripModel.destinations;
    const points = this.#tripModel.points;

    render(this.#routComponent, this.#routeContainer, RenderPosition.AFTERBEGIN);
    render(this.#sortComponent, this.#sortContainer);
    render(this.#addListComponent, this.#listContainer);
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
