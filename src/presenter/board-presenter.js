import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import AddListView from '../view/add-list-view.js';
import EditPointView from '../view/edit-point-view.js';
import {render} from '../render.js';

const EVENT_NUM = 3;

export default class BoardPresenter {
  sortComponent = new SortView();
  filterComponent = new FilterView();
  editComponent = new EditPointView();
  addListComponent = new AddListView();

  constructor({headerContainer, sortContainer, listContainer, editContainer}) {
    this.headerContainer = headerContainer;
    this.sortContainer = sortContainer;
    this.editContainer = editContainer;
    this.listContainer = listContainer;

  }

  init() {
    render(this.sortComponent, this.sortContainer);
    render(this.editComponent, this.editContainer);
    render(this.filterComponent, this.headerContainer);

    for (let i = 0; i < EVENT_NUM; i++) {
      render(this.addListComponent, this.listContainer);
    }

  }
}
