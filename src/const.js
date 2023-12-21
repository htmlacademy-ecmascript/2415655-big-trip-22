const EVENT_TYPES = ['taxi', 'flight', 'bus', 'train', 'ship', 'drive', 'check-in', 'sightseeing', 'restaurant'];
const CITIES = ['Los Angeles', 'Tokio', 'Amsterdam'];

export {EVENT_TYPES, CITIES};

export const getDefaultPoint = () => ({
  basePrice: 0,
  dateFrom: new Date().toISOString(),
  dateTo: new Date().toISOString(),
  destination: 0,
  isFavorite: false,
  offers: [],
  type: EVENT_TYPES[0],
});
