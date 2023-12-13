import BoardPresenter from './presenter/board-presenter.js';
import TasksModel from './model/task-model.js';

const siteSortElement = document.querySelector('.trip-events');
const siteInfoElement = document.querySelector('.trip-main');
const siteFilterElement = document.querySelector('.trip-controls__filters');
const tasksModel = new TasksModel();
const boardPresenter = new BoardPresenter({
  routeContainer: siteInfoElement,
  sortContainer: siteSortElement,
  filterContainer: siteFilterElement,
  listContainer: siteSortElement,
  tasksModel,
});

boardPresenter.init();
