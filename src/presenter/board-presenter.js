import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import AddPointView from '../view/add-point-view.js';
import ContainerListView from '../view/container-list-view.js';
import EditPointView from '../view/edit-point-view.js';
import RouteView from '../view/route-view.js';
import {render,RenderPosition} from '../render.js';

const EVENT_NUM = 3;

export default class BoardPresenter {
  addListComponent = new ContainerListView();

  sortComponent = new SortView();
  filterComponent = new FilterView();
  editComponent = new EditPointView();
  addPointComponent = new AddPointView();
  routComponent = new RouteView();

  constructor({filterContainer, sortContainer, listContainer, routeContainer}) {
    this.filterContainer = filterContainer;
    this.sortContainer = sortContainer;
    this.listContainer = listContainer;
    this.routeContainer = routeContainer;
  }

  init() {
    render(this.routComponent, this.routeContainer, RenderPosition.AFTERBEGIN);
    render(this.sortComponent, this.sortContainer);
    render(this.filterComponent, this.filterContainer);
    render(this.addListComponent, this.listContainer);
    render(this.editComponent, this.addListComponent.getElement());


    for (let i = 0; i < EVENT_NUM; i++) {
      render(this.addPointComponent, this.addListComponent.getElement());
    }

  }
}
