const { scanTable, getItem, putItem, updateItem, deleteItem } = require('../../clients/ddbClient');
const { parseEvening } = require('./formatter');

const getEvenings = async (tableName, semesterKey) => {
  const evenings = await scanTable(tableName, { semester: semesterKey });

  return evenings.map(parseEvening).sort(({ Datum: a }, { Datum: b }) => (a > b) - (b > a));
};

const getEveningWithDate = async (tableName, date) => {
  return getItem(tableName, 'Datum', date);
};

const createEvening = async (tableName, newEvening) => {
  await putItem(tableName, newEvening);
};

const updateEvening = async (tableName, updatedEvening) => {
  await updateItem(tableName, 'Datum', updatedEvening);
};

const deleteEveningWithDate = async (tableName, date) => {
  await deleteItem(tableName, 'Datum', date);
};

module.exports = {
  getEvenings,
  getEveningWithDate,
  createEvening,
  updateEvening,
  deleteEveningWithDate,
};
