import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import { render, replace, remove } from '../framework/render.js';
import {UserAction, UpdateType} from '../const.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {

  #containerComponent = null;
  #tripComponent = null;
  #tripEditComponent = null;
  #handleDataChange = null;

  #handleModeChange = null;
  #mode = Mode.DEFAULT;

  constructor({containerComponent, onDataChange, onModeChange}) {
    this.#containerComponent = containerComponent;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init (point, destinations, offers) {

    const prevPointComponent = this.#tripComponent;
    const prevPointEditComponent = this.#tripEditComponent;

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        this.#replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };


    this.#tripComponent = new PointView({
      point,
      destinations,
      offers,
      onEditClick: () => {
        this.#replaceCardToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      },
      onFavoriteClick: () => {
        // eslint-disable-next-line no-unused-expressions
        this.#handleFavoriteClick;
      },
    });

    this.#tripEditComponent = new EditPointView({
      point,
      destinations,
      offers,
      onFormClick: () => {
        this.#replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onTypeChange: (newType) => {
        this.point.setNewType(newType);
      },
      onDeleteClick: () => {
        remove(this.#tripEditComponent);
        // this.#replaceFormToCard();
        // this.#handleDataChange(UserAction.DELETE_EVENT, UpdateType.MINOR, point);
      },
      onSaveForm:  (update) => {
        this.#handleDataChange(
          UserAction.UPDATE_EVENT,
          UpdateType.MINOR,
          update,
        );
        this.#replaceFormToCard();
      },


    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#tripComponent, this.#containerComponent);
      return;
    }

    // if (this.#containerComponent.contains(prevPointComponent.element)) {
    //   replace(tripComponent, prevPointComponent);
    // }
    if (this.#mode === Mode.DEFAULT) {
      replace(this.#tripComponent, prevPointComponent);
    }
    if (this.#mode === Mode.EDITING) {
      replace(this.#tripEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);


  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToCard();
    }
  }

  destroy() {
    remove(this.#tripComponent);
    remove(this.#tripEditComponent);
  }

  #replaceCardToForm() {
    replace(this.#tripEditComponent, this.#tripComponent);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToCard() {
    replace(this.#tripComponent, this.#tripEditComponent);
    this.#mode = Mode.DEFAULT;
  }

  #removeCard() {
    remove(this.#tripComponent, this.#tripEditComponent);
    this.#mode = Mode.DEFAULT;
  }


  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_TASK,
      UpdateType.MINOR,
      {...this.point, isFavorite: !this.point.isFavorite},
    );
  };

  #handleArchiveClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_TASK,
      UpdateType.MINOR,
      {...this.point, isFavorite: !this.point.isFavorite},
    );
  };

  // #onDeleteClick = (point) => {
  //   this.#replaceFormToCard();
  //   this.#handleDataChange(UserAction.DELETE_EVENT, UpdateType.MINOR, point);
  // };

  // #onFormSubmit = (actionType, updateType, update) => {
  //   remove(this.#tripComponent);
  //   this.#handleDataChange(actionType, updateType, update);
  // };



}
