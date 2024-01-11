import PointView from '../view/point-view.js';
import ContainerListView from '../view/container-list-view.js';
import EditPointView from '../view/edit-point-view.js';
import NoEventView from '../view/no-event-view.js';
import { render, replace } from '../framework/render.js';
import TripModel from '../model/trip-model.js';

// Дефолтная точка
//import { getDefaultPoint } from '../const.js';
export default class PointPresenter {
  #pointComponent = null;
  #pointEditComponent = null;

  #pointChangeHandle = () => {};
  #modeChangeHandle = () => {};

  #point = null;
  #offers = [];
  #destinations = [];
  #mode = Mode.DEFAULT;


  #sortContainer = null;


  #addListComponent = new ContainerListView();


  constructor({sortContainer, onPointChange, onModeChange}) {
    this.#sortContainer = sortContainer;
    this.#pointChangeHandle = onPointChange;
    this.#modeChangeHandle = onModeChange;
  }

  init() {
    this.#renderPoint();
  }

  #renderTrip({point, destinations, offers}) {
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

  #renderPoint() {
    const tripModel = new TripModel();
    tripModel.init();
    const offers = tripModel.offers;
    const destinations = tripModel.destinations;
    const points = tripModel.points;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#sortContainer);
      return;
    }

    if (points.length === 0) {
      render(new NoEventView(), this.#sortContainer);
      return;
    }

    for (const point of points) {
      this.#renderTrip(point, destinations, offers);
    }
  }


}
