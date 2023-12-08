import BoardPresenter from './presenter/board-presenter.js';


import NewAddList from './view/add-list-view.js';
import NewEditPoint from './view/edit-point-view.js';
import {render} from './render.js';

const siteMainElement = document.querySelector('.page-body');
const siteFilterElement = siteMainElement.querySelector('.trip-controls__filters');
const siteSortElement = siteMainElement.querySelector('.trip-events');
const siteInfoElement = siteMainElement.querySelector('.trip-main');

const boardPresenter = new BoardPresenter({
  headerContainer: siteFilterElement,
  sortContainer: siteSortElement,
  infoContainer: siteInfoElement
});

render(new NewEditPoint(), siteSortElement);
render(new NewAddList(), siteSortElement);


boardPresenter.init();


