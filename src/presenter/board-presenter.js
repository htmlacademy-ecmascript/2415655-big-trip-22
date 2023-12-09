import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import AddListView from '../view/add-list-view.js';

import {render} from '../render.js';

export default class BoardPresenter {
  sortComponent = new SortView();
  filterComponent = new FilterView();
  addListComponent = new AddListView();

  constructor({headerContainer, sortContainer, listContainer}) {
    this.headerContainer = headerContainer;
    this.sortContainer = sortContainer;
    this.listContainer = listContainer;
  }

  init() {
    render(this.sortComponent, this.sortContainer);
    render(this.filterComponent, this.headerContainer);

    for (let i = 0; i < 3; i++) {
      render(this.addListComponent, this.listContainer);
    }
  }
}
