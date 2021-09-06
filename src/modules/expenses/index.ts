import { scanTable, putItem, updateItem, deleteItem } from '../../clients/ddbClient';

const getExpenses = async (tableName: string): Promise<Expense[]> => {
  const expenses = await scanTable<Expense>(tableName);

  return expenses.sort(({ art: a }, { art: b }) => Number(a > b) - Number(b > a));
};

const createExpense = async (tableName: string, newExpense: Expense): Promise<Expense> => {
  await putItem(tableName, newExpense);

  return newExpense;
};

const updateExpense = async (tableName: string, updatedExpense: Expense): Promise<Expense> => {
  await updateItem(tableName, 'art', updatedExpense);

  return updatedExpense;
};

const deleteExpenseWithKey = async (tableName: string, kind: string): Promise<string> => {
  await deleteItem(tableName, 'art', kind);

  return kind;
};

export { getExpenses, createExpense, updateExpense, deleteExpenseWithKey };
