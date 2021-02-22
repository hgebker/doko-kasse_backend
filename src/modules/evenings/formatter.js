const flow = require('lodash/flow');

const calculateSum = values => values.reduce((sum, el) => sum + el, 0);

const calculateAverage = (value, count) => value / count;

const filterIncomeEntries = entries => {
  return entries.filter(([key]) => !['Datum', 'semester'].includes(key));
};

const filterPlayerEntries = entries => {
  return entries.filter(([key]) => !['Datum', 'semester', 'sonstige'].includes(key));
};

const filterPresentPlayerEntries = entries => {
  return entries.filter(([, value]) => !!value);
};

const mapEntriesToValues = entries => {
  return entries.map(([, value]) => value);
};

const parseEvening = evening => {
  const playerEntries = filterPlayerEntries(Object.entries(evening));
  const presentPlayerValues = flow(filterPresentPlayerEntries, mapEntriesToValues)(playerEntries);

  const sum = calculateSum(presentPlayerValues);
  const avg = calculateAverage(sum, presentPlayerValues.length);

  const max = Math.max(...presentPlayerValues);
  const maxPlayer = playerEntries.filter(([, value]) => value === max).join(', ');

  const min = Math.min(...presentPlayerValues);
  const minPlayer = playerEntries.filter(([, value]) => value === min).join(', ');

  return {
    Datum: evening.Datum,
    semester: evening.semester,
    sonstige: evening.sonstige,
    ...Object.fromEntries(playerEntries),
    sum,
    avg,
    max,
    min,
    maxPlayer,
    minPlayer,
  };
};

const parseSum = flow(Object.entries, filterIncomeEntries, mapEntriesToValues, calculateSum);

module.exports = { parseEvening, parseSum };
