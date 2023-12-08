import NewFilterForm from '../view/filter-view.js';
import NewSortEvent from '../view/sort-head-view.js';
import NewAddList from '../view/add-list-view.js';

import {render} from '../render.js';

export default class BoardPresenter {
  sortComponent = new NewSortEvent();
  filterComponent = new NewFilterForm();
  addListComponent = new NewAddList();

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
