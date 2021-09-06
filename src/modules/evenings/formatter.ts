import flow from 'lodash/flow';
import {
  filterPlayerEntries,
  getPresentPlayerValues,
  calculateSum,
  calculateAverage,
  formatBestWorstPlayer,
  getPlayerValues,
} from './helper';

const parseEvening = (evening: Evening): ParsedEvening => {
  const allEntries = Object.entries(evening);

  const playerEntries = filterPlayerEntries(allEntries);
  const presentPlayerValues = getPresentPlayerValues(playerEntries);

  const sum = calculateSum(presentPlayerValues);
  const avg = calculateAverage(calculateSum(presentPlayerValues), presentPlayerValues.length);

  const max = Math.max(...presentPlayerValues);
  const maxPlayer = formatBestWorstPlayer(playerEntries, max);

  const min = Math.min(...presentPlayerValues);
  const minPlayer = formatBestWorstPlayer(playerEntries, min);

  return {
    ...evening,
    sum,
    avg,
    max,
    min,
    maxPlayer,
    minPlayer,
  };
};

const parseSum: (evening: Evening) => number = flow(Object.entries, getPlayerValues, calculateSum);

export { parseEvening, parseSum };
