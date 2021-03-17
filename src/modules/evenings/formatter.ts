import flow from 'lodash/flow';
import {
  filterPlayerEntries,
  getPresentPlayerValues,
  getIncomeValues,
  calculateSum,
  calculateAverage,
  formatBestWorstPlayer,
} from './helper';

const parseEvening = (evening: Evening): ParsedEvening => {
  const allEntries = Object.entries(evening);

  const incomeValues = getIncomeValues(allEntries);
  const playerEntries = filterPlayerEntries(allEntries);
  const presentPlayerValues = getPresentPlayerValues(allEntries);

  const sum = calculateSum(incomeValues);
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

const parseSum: (evening: Evening) => number = flow(Object.entries, getIncomeValues, calculateSum);

export { parseEvening, parseSum };
