import {getRandomArrayElement} from '../utils/common.js';
import {nanoid} from 'nanoid';

export const points = [
  {
    id: nanoid(),
    basePrice: 1000,
    dateFrom: '2019-07-11T11:15:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: '1',
    isFavorite: false,
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa32'
    ],
    type: 'taxi'
  },
  {
    id: nanoid(),
    basePrice: 2300,
    dateFrom: '2029-02-10T02:55:56.845Z',
    dateTo: '2029-02-10T04:22:13.375Z',
    destination: '2',
    isFavorite: false,
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa33'
    ],
    type: 'flight'
  },
  {
    id: nanoid(),
    basePrice: 500,
    dateFrom: '2019-05-10T05:55:56.845Z',
    dateTo: '2019-05-10T12:22:13.375Z',
    destination: '3',
    isFavorite: false,
    offers: [],
    type: 'bus'
  },
  {
    id: nanoid(),
    basePrice: 500,
    dateFrom: '2019-05-10T05:55:56.845Z',
    dateTo: '2019-05-10T12:22:13.375Z',
    destination: '3',
    isFavorite: true,
    offers: [],
    type: 'bus'
  }
];

function getRandomTrip() {
  const pointsRandom = Array.from({length: 0});

  while (pointsRandom.length < 4) {
    const item = getRandomArrayElement(points);

    if (!pointsRandom.includes(item)) {
      pointsRandom.push(item);
    }
  }

  return pointsRandom;
}

export {getRandomTrip};
