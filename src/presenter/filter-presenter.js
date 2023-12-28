import FilterView from '../view/filter-view.js';
import {render} from '../framework/render.js';
import TripModel from '../model/trip-model.js';
import {generateFilter} from '../mock/filter.js';

export default class BoardPresenter {
  #filterContainer = null;

  constructor({ filterContainer}) {
    this.#filterContainer = filterContainer;
  }

  init() {
    const tripModel = new TripModel();
    tripModel.init();
    const filters = generateFilter(tripModel.points);
    render(new FilterView({filters}), this.#filterContainer);
  }
}
