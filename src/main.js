import BoardPresenter from './presenter/board-presenter.js';
import PointModel from './model/point-model.js';

const siteSortElement = document.querySelector('.trip-events');
const siteInfoElement = document.querySelector('.trip-main');
const siteFilterElement = document.querySelector('.trip-controls__filters');

const pointModel = new PointModel();
pointModel.init();


const boardPresenter = new BoardPresenter({
  routeContainer: siteInfoElement,
  sortContainer: siteSortElement,
  filterContainer: siteFilterElement,
  listContainer: siteSortElement,
  pointModel: pointModel,
});

boardPresenter.init();
