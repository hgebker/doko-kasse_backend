import { scanTable, getItem, putItem, updateItem, deleteItem } from '../../clients/ddbClient';
import { Evening, ParsedEvening } from './evenings';
import { parseEvening } from './formatter';

const getEvenings = async (tableName: string, semesterKey: string): Promise<ParsedEvening[]> => {
  const evenings = await scanTable<Evening>(tableName, { semester: semesterKey });

  return evenings.map(parseEvening).sort(({ Datum: a }, { Datum: b }) => Number(a > b) - Number(b > a));
};

const getEveningWithDate = async (tableName: string, date: string) => {
  return getItem<Evening>(tableName, 'Datum', date);
};

const createEvening = async (tableName: string, newEvening: Evening) => {
  return putItem(tableName, newEvening);
};

const updateEvening = async (tableName: string, updatedEvening: Evening) => {
  return updateItem(tableName, 'Datum', updatedEvening);
};

const deleteEveningWithDate = async (tableName: string, date: string) => {
  return deleteItem(tableName, 'Datum', date);
};

export { getEvenings, getEveningWithDate, createEvening, updateEvening, deleteEveningWithDate };
