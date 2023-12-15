import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import AddPointView from '../view/add-point-view.js';
import ContainerListView from '../view/container-list-view.js';
import EditPointView from '../view/edit-point-view.js';
import RouteView from '../view/route-view.js';
import {render,RenderPosition} from '../render.js';

export default class BoardPresenter {
  addListComponent = new ContainerListView();

  sortComponent = new SortView();
  filterComponent = new FilterView();
  editComponent = new EditPointView();
  addPointComponent = new AddPointView();
  routComponent = new RouteView();

  constructor({filterContainer, sortContainer, listContainer, routeContainer, pointModel}) {
    this.filterContainer = filterContainer;
    this.sortContainer = sortContainer;
    this.listContainer = listContainer;
    this.routeContainer = routeContainer;
    this.pointModel = pointModel;
  }

  init() {
    const offers = this.pointModel.getOffers();
    const destinations = this.pointModel.getDestinations();
    const points = this.pointModel.getPoints();

    render(this.routComponent, this.routeContainer, RenderPosition.AFTERBEGIN);
    render(this.sortComponent, this.sortContainer);
    render(this.filterComponent, this.filterContainer);
    render(this.addListComponent, this.listContainer);
    render(new EditPointView(points[0], destinations, offers), this.addListComponent.getElement());

    for (const point of points) {
      render(new AddPointView(point, destinations, offers), this.addListComponent.getElement());
    }
  }
}
