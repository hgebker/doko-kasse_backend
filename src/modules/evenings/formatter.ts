import flow from 'lodash/flow';
import {
  filterPlayerEntries,
  getPresentPlayerValues,
  calculateSum,
  calculateAverage,
  formatBestWorstPlayer,
  filterIncomeEntries,
  mapEntriesToValues,
} from './helper';

const parseEvening = (evening: Evening): ParsedEvening => {
  const playerEntries = filterPlayerEntries(Object.entries(evening));
  const presentPlayerValues = getPresentPlayerValues(playerEntries);

  const sum = calculateSum(presentPlayerValues);
  const avg = calculateAverage(sum, presentPlayerValues.length);

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

const parseSum: (evening: Evening) => number = flow(
  Object.entries,
  filterIncomeEntries,
  mapEntriesToValues,
  calculateSum
);

export { parseEvening, parseSum };
