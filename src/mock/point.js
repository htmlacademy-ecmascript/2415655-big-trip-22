import {getRandomArrayElement} from '../utils/common.js';

export const points = [
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808c',
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
    id: 'f4b62099-293f-4c3d-a702-94eec4a2802c',
    basePrice: 2300,
    dateFrom: '2019-02-10T02:55:56.845Z',
    dateTo: '2019-02-10T04:22:13.375Z',
    destination: '2',
    isFavorite: false,
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa33'
    ],
    type: 'flight'
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2818c',
    basePrice: 500,
    dateFrom: '2019-05-10T05:55:56.845Z',
    dateTo: '2019-05-10T12:22:13.375Z',
    destination: '3',
    isFavorite: false,
    offers: [],
    type: 'bus'
  },
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2818c',
    basePrice: 500,
    dateFrom: '2019-05-10T05:55:56.845Z',
    dateTo: '2019-05-10T12:22:13.375Z',
    destination: '3',
    isFavorite: false,
    offers: [],
    type: 'bus'
  }
];

function getRandomTrip() {
  return getRandomArrayElement(points);
}

export {getRandomTrip};
