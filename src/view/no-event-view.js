import AbstractView from '../framework/view/abstract-view.js';

const createNoEventView = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

export default class NoEventView extends AbstractView{
  get template() {
    return createNoEventView();
  }
}
