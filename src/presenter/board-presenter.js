import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import PointView from '../view/point-view.js';
import ContainerListView from '../view/container-list-view.js';
import EditPointView from '../view/edit-point-view.js';
import RouteView from '../view/route-view.js';
import {render,RenderPosition} from '../render.js';
import { getDefaultPoint } from '../const.js';
export default class BoardPresenter {
  addListComponent = new ContainerListView();

  sortComponent = new SortView();
  filterComponent = new FilterView();
  editComponent = new EditPointView();
  addPointComponent = new PointView();
  routComponent = new RouteView();

  constructor({filterContainer, sortContainer, listContainer, routeContainer, tripModel}) {
    this.filterContainer = filterContainer;
    this.sortContainer = sortContainer;
    this.listContainer = listContainer;
    this.routeContainer = routeContainer;
    this.tripModel = tripModel;
  }

  init() {
    const offers = this.tripModel.getOffers();
    const destinations = this.tripModel.getDestinations();
    const points = this.tripModel.getPoints();

    render(this.routComponent, this.routeContainer, RenderPosition.AFTERBEGIN);
    render(this.sortComponent, this.sortContainer);
    render(this.filterComponent, this.filterContainer);
    render(this.addListComponent, this.listContainer);
    render(new EditPointView(getDefaultPoint(), destinations, offers), this.addListComponent.getElement());
    render(new EditPointView(points[2], destinations, offers), this.addListComponent.getElement());

    for (const point of points) {
      render(new PointView(point, destinations, offers), this.addListComponent.getElement());
    }
  }
}
