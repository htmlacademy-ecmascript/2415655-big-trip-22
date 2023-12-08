import NewFilterForm from '../view/filter-view.js';
import NewSortEvent from '../view/sort-head-view.js';
import NewRoute from '../view/route-view.js';

import {render} from '../render.js';

export default class BoardPresenter {
  sortComponent = new NewSortEvent();
  infoComponent = new NewRoute();
  filterComponent = new NewFilterForm();


  constructor({headerContainer, sortContainer, infoContainer}) {
    this.headerContainer = headerContainer;
    this.sortContainer = sortContainer;
    this.infoContainer = infoContainer;
  }

  init() {
    render(this.sortComponent, this.sortContainer);
    render(this.infoComponent, this.infoContainer);
    render(this.filterComponent, this.headerContainer);

  }
}
