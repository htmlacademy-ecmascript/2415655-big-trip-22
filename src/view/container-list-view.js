import AbstractView from '../framework/view/abstract-view.js';

function createContainerList() {
  // eslint-disable-next-line quotes
  return `<ul class="trip-events__list"></ul>`;
}

export default class ContainerListView extends AbstractView{
  get template() {
    return createContainerList();
  }
}
