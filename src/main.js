import BoardPresenter from './presenter/board-presenter.js';
import TripModel from './model/trip-model.js';
import {generateFilter} from './mock/filter.js';
import FilterView from './view/filter-view.js';
import { render } from './framework/render.js';

const sortElement = document.querySelector('.trip-events');
const infoElement = document.querySelector('.trip-main');
const filterElement = document.querySelector('.trip-controls__filters');

const tripModel = new TripModel();
tripModel.init();

const boardPresenter = new BoardPresenter({
  routeContainer: infoElement,
  sortContainer: sortElement,
  //filterContainer: filterElement,
  listContainer: sortElement,
  tripModel: tripModel,
});

const filters = generateFilter(tripModel.points);
render(new FilterView({filters}), filterElement);

boardPresenter.init();
