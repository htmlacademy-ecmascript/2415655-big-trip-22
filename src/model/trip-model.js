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

}
