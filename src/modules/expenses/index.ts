import { scanTable, putItem, updateItem, deleteItem } from '../../clients/ddbClient';

const getExpenses = async (tableName: string) => {
  const expenses = await scanTable<Expense>(tableName);

  return expenses.sort(({ art: a }, { art: b }) => Number(a > b) - Number(b > a));
};

const createExpense = async (tableName: string, newExpense: Expense) => {
  await putItem(tableName, newExpense);
};

const updateExpense = async (tableName: string, updatedExpense: Expense) => {
  await updateItem(tableName, 'art', updatedExpense);
};

const deleteExpenseWithKey = async (tableName: string, kind: string) => {
  await deleteItem(tableName, 'art', kind);
};

export { getExpenses, createExpense, updateExpense, deleteExpenseWithKey };
