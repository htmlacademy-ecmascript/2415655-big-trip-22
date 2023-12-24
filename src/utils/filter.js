import {FilterType} from '../const.js';
import {isEventFuture, isEventToday, isEventPast} from '../utils/event.js';

const filter = {
  [FilterType.EVERTHING]: (points) => points.filter((point) => !point.isArchive),
  [FilterType.FUTURE]: (points) => points.filter((point) => isEventFuture(point.dueDate) && !point.isArchive),
  [FilterType.PRESENT]: (points) => points.filter((point) => isEventToday(point.dueDate) && !point.isArchive),
  [FilterType.PAST]: (points) => points.filter((point) => isEventPast(point.dueDate) && !point.isArchive),
};

export {filter};
