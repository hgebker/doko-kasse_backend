import flow from 'lodash/flow';

const calculateSum = (values: number[]): number => values.reduce((sum, el) => sum + el, 0);

const calculateAverage = (value: number, count: number): number => value / count;

const filterPlayerEntries = (entries: EveningEntry[]): PlayerEntry[] => {
  return entries.filter(([key]) => !['Datum', 'semester', 'gezahlt'].includes(key)) as PlayerEntry[];
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

const filterEntriesForValue = (searchValue: number): ((entries: PlayerEntry[]) => PlayerEntry[]) => {
  return entries => entries.filter(([, value]) => value === searchValue);
};

const formatBestWorstPlayer = (entries: PlayerEntry[], value: number): string => {
  return flow(filterEntriesForValue(value), mapEntriesToKeys)(entries).join(', ');
};

const getPlayerValues = flow(filterPlayerEntries, mapEntriesToValues);

const getPresentPlayerValues = flow(filterPresentPlayerEntries, mapEntriesToValues);

export {
  calculateSum,
  calculateAverage,
  filterPlayerEntries,
  filterPresentPlayerEntries,
  mapEntriesToValues,
  mapEntriesToKeys,
  filterEntriesForValue,
  formatBestWorstPlayer,
  getPresentPlayerValues,
  getPlayerValues,
};
