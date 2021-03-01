const { scanTable, putItem, updateItem, deleteItem } = require('../../clients/ddbClient');

const getExpenses = async tableName => {
  const expenses = await scanTable(tableName);

  return expenses.sort(({ art: a }, { art: b }) => (a > b) - (b > a));
};

const createExpense = async (tableName, newExpense) => {
  await putItem(tableName, newExpense);
};

const updateExpense = async (tableName, updatedExpense) => {
  await updateItem(tableName, 'art', updatedExpense);
};

const deleteExpenseWithKey = async (tableName, kind) => {
  await deleteItem(tableName, 'art', kind);
};

module.exports = {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpenseWithKey,
};
