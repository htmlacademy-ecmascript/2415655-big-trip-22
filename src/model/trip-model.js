import {destinations} from '../mock/destinations.js';
import {offers} from '../mock/offers.js';
import {points} from '../mock/point.js';

// const COUNT_TRIP = 7;
export default class TripModel {
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
    this.#points = points;
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
