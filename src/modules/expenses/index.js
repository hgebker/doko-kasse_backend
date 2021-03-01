const { scanTable, putItem, updateItem, deleteItem } = require('../../clients/ddbClient');

const getExpenses = async tableName => {
  const expenses = await scanTable(tableName);

  return expenses.sort(({ art: a }, { art: b }) => (a > b) - (b > a));
};

const createExpense = async (tableName, evening) => {
  await putItem(tableName, evening);
};

const updateExpenseWithKey = async (tableName, kind, updatedExpense) => {
  await updateItem(tableName, { art: kind }, updatedExpense);
};

const deleteExpenseWithKey = async (tableName, kind) => {
  await deleteItem(tableName, { art: kind });
};

module.exports = {
  getExpenses,
  createExpense,
  updateExpenseWithKey,
  deleteExpenseWithKey,
};
