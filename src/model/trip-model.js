import Observable from '../framework/observable.js';
import {destinations} from '../mock/destinations.js';
import {offers} from '../mock/offers.js';
import {getRandomTrip} from '../mock/point.js';

export default class TripModel extends Observable {
  #points = null;
  #destinations = null;
  #offers = null;

  consrtuctor() {
    this.#destinations = [];
    this.#offers = [];
    this.#points = [];
  }

  init() {
    this.#destinations = destinations;
    this.#offers = offers;
    this.#points = getRandomTrip();
  }

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  updateTask(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addTask(updateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  }

  deleteTask(updateType, update) {
    const index = this.#points.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }

}
