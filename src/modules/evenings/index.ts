import { scanTable, getItem, putItem, updateItem, deleteItem } from '../../clients/ddbClient';
import { parseEvening } from './formatter';

const getEvenings = async (tableName: string, semesterKey: string): Promise<ParsedEvening[]> => {
  const evenings = await scanTable<Evening>(tableName, { semester: semesterKey });

  return evenings.map(parseEvening).sort(({ Datum: a }, { Datum: b }) => Number(a > b) - Number(b > a));
};

const getEveningWithDate = async (tableName: string, date: string): Promise<ParsedEvening> => {
  return getItem<Evening>(tableName, 'Datum', date);
};

const createEvening = async (tableName: string, newEvening: Evening): Promise<ParsedEvening> => {
  await putItem(tableName, newEvening);

  return parseEvening(newEvening);
};

const updateEvening = async (tableName: string, updatedEvening: Evening): Promise<Evening> => {
  await updateItem(tableName, 'Datum', updatedEvening);

  return parseEvening(updatedEvening);
};

const deleteEveningWithDate = async (tableName: string, date: string): Promise<string> => {
  await deleteItem(tableName, 'Datum', date);

  return date;
};

export { getEvenings, getEveningWithDate, createEvening, updateEvening, deleteEveningWithDate };
