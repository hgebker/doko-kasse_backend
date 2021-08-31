import { scanTable, putItem, updateItem, deleteItem } from 'clients/ddbClient';

const getEarnings = async (tableName: string): Promise<Earning[]> => {
  const earnings = await scanTable<Earning>(tableName);

  return earnings.sort(({ art: a }, { art: b }) => Number(a > b) - Number(b > a));
};

const createEarning = async (tableName: string, newEarning: Earning): Promise<Earning> => {
  await putItem(tableName, newEarning);

  return newEarning;
};

const updateEarning = async (tableName: string, updatedEarning: Earning): Promise<Earning> => {
  await updateItem(tableName, 'art', updatedEarning);

  return updatedEarning;
};

const deleteEarningWithKey = async (tableName: string, kind: string): Promise<string> => {
  await deleteItem(tableName, 'art', kind);

  return kind;
};

export { getEarnings, createEarning, updateEarning, deleteEarningWithKey };
