import AbstractView from '../framework/view/abstract-view.js';
import { EVENT_TYPES } from '../const.js';
import { formatDateFull } from '../utils.js';

const createEditPoint = (point, destinations, offers) => {
  console.log(destinations)
  const pointDestination = destinations.find((dest) => dest.id === point.destination);
  const typeOffers = offers.find((off) => off.type === point.type).offers;
  const pointOffers = typeOffers.filter((typeOffer) => point.offers.includes(typeOffer.id));
  const {basePrice, dateFrom, dateTo, type} = point;
  const {name, description, pictures} = pointDestination || {};
  const pointId = point.id || 0;
  return `
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-${pointId}">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${pointId}" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                      ${EVENT_TYPES.map((pointType) => (
    `<div class="event__type-item">
                            <input id="event-type-${pointType}-${pointId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointType}" ${pointType === type ? 'checked' : ''}>
                            <label class="event__type-label  event__type-label--${pointType}" for="event-type-${pointType}-${pointId}">${pointType}</label>
                          </div>`
  )).join('')}



                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-${pointId}">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-${pointId}" type="text" name="event-destination" value="${name || ''}" list="destination-list-${pointId}">
                    <datalist id="destination-list-${pointId}">
                    ${destinations.map((destination)=>`<option value="${destination.name}"></option>`).join('')}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-${pointId}">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-${pointId}" type="text" name="event-start-time" value="${formatDateFull(dateFrom)}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-${pointId}">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-${pointId}" type="text" name="event-end-time" value="${formatDateFull(dateTo)}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-${pointId}">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-${pointId}" type="text" name="event-price" value="${basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">${point.id ? 'Delete' : 'Cancel'}</button>
                  ${point.id ? (
    `
                    <button class="event__rollup-btn" type="button">
                       <span class="visually-hidden">Open event</span>
                    </button>
                    `
  ) : ''}
                </header>

                <section class="event__details">
                ${typeOffers.length ?
    `<section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                    ${typeOffers.map((typeOffer) => (
    `<div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${typeOffer.title}-${pointId}" type="checkbox" name="event-offer-${typeOffer.title}" ${pointOffers.map((offer)=>offer.id).includes(typeOffer.id) ? 'checked' : ''}>
                        <label class="event__offer-label" for="event-offer-${typeOffer.title}-${pointId}">
                          <span class="event__offer-title">${typeOffer.title}</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">${typeOffer.price}</span>
                        </label>
                      </div>`
  )).join('')}
                    </div>
                  </section>`
    : '' }

                ${pointDestination ? (
    ` <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${description}</p>
                  ${pictures.length > 0 ? (
      `<div class="event__photos-container">
                      <div class="event__photos-tape">
                      ${pictures.map((pic)=>`<img class="event__photo" src="${pic.src}" alt="${pic.description}">`)}

                      </div>
                    </div>`
    ) : ''}
                  </section>`
  ) : ''}
                </section>
              </form>
           `;
};

export default class EditPointView extends AbstractView{
  #point = null;
  #destinations = null;
  #offers = null;

  #handleEditClick = null;


  constructor({point, destinations, offers, onFormClick}) {
    super();
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;

    this.#handleEditClick = onFormClick;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formClickHandler);
  }

  get template() {
    return createEditPoint(this.#point, this.#destinations, this.#offers);
  }

  #formClickHandler = (evt) => {
    evt.preventDefault();
    // eslint-disable-next-line no-unused-expressions
    this.#handleEditClick();
  };


}
