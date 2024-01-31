const EVENT_TYPES = ['taxi', 'flight', 'bus', 'train', 'ship', 'drive', 'check-in', 'sightseeing', 'restaurant'];
const CITIES = ['Los Angeles', 'Tokio', 'Amsterdam'];

export const getDefaultPoint = () => ({
  basePrice: 0,
  dateFrom: new Date().toISOString(),
  dateTo: new Date().toISOString(),
  destination: 0,
  isFavorite: false,
  offers: [],
  type: EVENT_TYPES[0],
});

const FilterType = {
  EVERTHING: 'everthing',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};
const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};
const ModeType = {
  DEFAULT: 'DEFAULT',
  EDIT: 'EDIT',
  NEW: 'NEW',
};

const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const BLANK_POINT = {
  'id': 0,
  'type': EVENT_TYPES[5].toLowerCase(),
  'destination': '',
  'dateFrom': '',
  'dateTo': '',
  'basePrice': 0,
  'offers': [],
  'isFavorite': false,
};

export {EVENT_TYPES, CITIES, FilterType, SortType, UserAction, UpdateType, ModeType, BLANK_POINT};
