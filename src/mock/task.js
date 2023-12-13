import { getRandomArrayElement } from '../utils.js';
import { EVENT,CITY } from '../const.js';

const mockTasks = [
  {
    event: getRandomArrayElement(EVENT),
    city: getRandomArrayElement(CITY),
    dueDate: null,
    price: '100$',
    offers: {
      luggage: true,
      comfort: true,
      meal: false,
      seats: false,
      train: false
    },
    description: 'Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.',
    photo: true
  },
  {
    event: getRandomArrayElement(EVENT),
    city: getRandomArrayElement(CITY),
    dueDate: null,
    price: '3100$',
    offers: {
      luggage: true,
      comfort: true,
      meal: true,
      seats: false,
      train: false
    },
    description: 'My journey',
    photo: true
  },
  {
    event: getRandomArrayElement(EVENT),
    city: getRandomArrayElement(CITY),
    dueDate: null,
    price: '200$',
    offers: {
      luggage: true,
      comfort: false,
      meal: false,
      seats: true,
      train: false
    },
    description: 'Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.',
    photo: false
  }
];

function getRandomTask() {
  return getRandomArrayElement(mockTasks);
}

export {getRandomTask};
