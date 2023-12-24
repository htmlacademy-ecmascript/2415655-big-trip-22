import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'hh:mm';
const DATE_FORMAT_FULL = 'DD/MM/YY hh:mm';

function formatDate(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT) : '';
}

function formatDateFull(dueDate) {
  return dueDate ? dayjs.utc(dueDate).format(DATE_FORMAT_FULL) : '';
}

function formatTime(dueTime) {
  return dueTime ? dayjs.utc(dueTime).format(TIME_FORMAT) : '';
}

function differenceTime(toTime, fromTime) {
  const diffMin = dayjs.utc(toTime).diff(fromTime, 'minute');
  const diffHour = dayjs.utc(toTime).diff(fromTime, 'hour');
  const diffResult = diffMin - diffHour * 60;
  return diffMin < 60 ? `${diffMin + 1}m` : `${diffHour}h ${diffResult + 1}m`;
}
function isEventFuture(dueDate) {
  return dueDate && dayjs().isAfter(dueDate, 'D');
}

function isEventToday(dueDate) {
  return dueDate && dayjs(dueDate).isSame(dayjs(), 'D');
}

function isEventPast(dueDate) {
  return dueDate && dayjs(dueDate).isBefore(dayjs(), 'D');
}

export {formatDate, formatTime, differenceTime, formatDateFull, isEventFuture, isEventToday, isEventPast };
