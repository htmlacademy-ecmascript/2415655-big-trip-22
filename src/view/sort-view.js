import AbstractView from '../framework/view/abstract-view.js';
import {SortType} from '../const.js';

function createSortItemTemplate(type, isChecked, count) {


  return (
    `
      <div class="trip-sort__item  trip-sort__item--${type}">
        <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}" data-sort-type="${type}"
        ${isChecked ? 'checked' : ''}
        ${count === 0 ? 'disabled' : ''}>
        <label class="trip-sort__btn" for="sort-${type}">${type}</label>
       </div>
    `
  );
}
function createSortTemplate() {
  const sortItemsTemplate = SortType
    .map((index) => createSortItemTemplate(index))
    .join('');

  return (
    `<form class="trip-filters" action="#" method="get">
      ${sortItemsTemplate}
    </form>`
  );
}

export default class SortView extends AbstractView{
  #handleSortTypeChange = null;

  constructor({onSortTypeChange}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);

    // document.addEventListener("click", function(e) {
    //   if (e.target.className=="trip-sort__btn") {
    //    alert("click");
    //    //ваши действия
    //   }
    // });
  }

  get template() {
    return createSortTemplate();
  }

  #sortTypeChangeHandler = (evt) => {

    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);

  };
}

