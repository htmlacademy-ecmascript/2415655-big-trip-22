import BoardPresenter from './presenter/board-presenter.js';
import RouteView from './view/route-view.js';
import {render,RenderPosition} from './render.js';

const siteMainElement = document.querySelector('.page-body');
const siteSortElement = siteMainElement.querySelector('.trip-events');
const siteInfoElement = siteMainElement.querySelector('.trip-main');
const siteFilterElement = siteMainElement.querySelector('.trip-controls__filters');


const boardPresenter = new BoardPresenter({
  sortContainer: siteSortElement,
  headerContainer: siteFilterElement,
  editContainer: siteSortElement,
  listContainer: siteSortElement
});

boardPresenter.init();

render(new RouteView(), siteInfoElement, RenderPosition.AFTERBEGIN);
