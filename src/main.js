import BoardPresenter from './presenter/board-presenter.js';

const siteSortElement = document.querySelector('.trip-events');
const siteInfoElement = document.querySelector('.trip-main');
const siteFilterElement = document.querySelector('.trip-controls__filters');

const boardPresenter = new BoardPresenter({
  routeContainer: siteInfoElement,
  sortContainer: siteSortElement,
  filterContainer: siteFilterElement,
  listContainer: siteSortElement
});

boardPresenter.init();
