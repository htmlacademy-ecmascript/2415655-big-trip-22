import {destinations} from '../mock/destinations.js';
import {offers} from '../mock/offers.js';
import {points} from '../mock/point.js';

export default class PointModel {
  consrtuctor() {
    this.destinations = [];
    this.offers = [];
    this.points = [];
  }

  init() {
    this.destinations = destinations;
    this.offers = offers;
    this.points = points;
  }

  getPoints() {
    return this.points;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }

}
