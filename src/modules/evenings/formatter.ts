import flow from 'lodash/flow';

type EveningEntry = [string, any];

type IncomeEntry = [IncomeKey, number];

type PlayerEntry = [PlayerKey, number];

const calculateSum = (values: number[]): number => values.reduce((sum, el) => sum + el, 0);

const calculateAverage = (value: number, count: number): number => value / count;

const filterIncomeEntries = (entries: EveningEntry[]): IncomeEntry[] => {
  return entries.filter(([key]) => !['Datum', 'semester'].includes(key));
};

const filterPlayerEntries = (entries: EveningEntry[]): PlayerEntry[] => {
  return entries.filter(([key]) => !['Datum', 'semester', 'sonstige'].includes(key));
};

const filterPresentPlayerEntries = (entries: PlayerEntry[]): PlayerEntry[] => {
  return entries.filter(([, value]) => !!value);
};

const mapEntriesToValues = (entries: PlayerEntry[]): number[] => {
  return entries.map(([, value]) => value);
};

const mapEntriesToKeys = (entries: PlayerEntry[]): PlayerKey[] => {
  return entries.map(([key]) => key);
};

const filterEntriesForValue = (searchValue: any) => {
  return (entries: PlayerEntry[]) => entries.filter(([, value]) => value === searchValue);
};

const formatBestWorstPlayer = (entries: PlayerEntry[], value: any) => {
  return flow(filterEntriesForValue(value), mapEntriesToKeys)(entries).join(', ');
};

const getPresentPlayerValues = flow(filterPresentPlayerEntries, mapEntriesToValues);

const parseEvening = (evening: Evening): ParsedEvening => {
  const playerEntries = filterPlayerEntries(Object.entries(evening));
  const presentPlayerValues = getPresentPlayerValues(playerEntries);

  const sum = calculateSum(presentPlayerValues);
  const avg = calculateAverage(sum, presentPlayerValues.length);

  const max = Math.max(...presentPlayerValues);
  const maxPlayer = formatBestWorstPlayer(playerEntries, max);

  const min = Math.min(...presentPlayerValues);
  const minPlayer = formatBestWorstPlayer(playerEntries, min);

  const playerObject = Object.fromEntries(playerEntries);

  return {
    Datum: evening.Datum,
    semester: evening.semester,
    sonstige: evening.sonstige,
    ...playerObject,
    sum,
    avg,
    max,
    min,
    maxPlayer,
    minPlayer,
  };
};

const parseSum = flow(Object.entries, filterIncomeEntries, mapEntriesToValues, calculateSum);

export { parseEvening, parseSum };
