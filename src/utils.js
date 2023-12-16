import dayjs from 'dayjs';

const DATE_FORMAT = 'D MMMM';
const TIME_FORMAT = 'hh:mm';
const DATE_FORMAT_FULL = 'DD/MM/YY hh:mm';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function formatDate(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT) : '';
}

function formatDateFull(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT_FULL) : '';
}

function formatTime(dueTime) {
  return dueTime ? dayjs(dueTime).format(TIME_FORMAT) : '';
}

function differenceTime(toTime, fromTime) {
  const diffMin = dayjs(toTime).diff(fromTime, 'minute');
  const diffHour = dayjs(toTime).diff(fromTime, 'hour');
  return diffMin < 60 ? `${diffMin}m` : `${diffHour}h`;
}

export {getRandomArrayElement, formatDate, formatTime, differenceTime, formatDateFull};
