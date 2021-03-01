const { scanTable, getItem, putItem, updateItem, deleteItem } = require('../../clients/ddbClient');
const { parseEvening } = require('./formatter');

const getEvenings = async (tableName, semester) => {
  let scanFilter;

  if (semester) {
    scanFilter = {
      semester: {
        ComparisonOperator: 'EQ',
        AttributeValueList: [semester],
      },
    };
  }

  const evenings = await scanTable(tableName, scanFilter);

  return evenings.map(parseEvening).sort(({ Datum: a }, { Datum: b }) => (a > b) - (b > a));
};

const getEveningWithDate = async (tableName, date) => {
  return getItem(tableName, 'Datum', date);
};

const createEvening = async (tableName, evening) => {
  await putItem(tableName, evening);
};

const updateEveningwithDate = async (tableName, date, evening) => {
  await updateItem(tableName, 'Datum', evening);
};

const deleteEveningWithDate = async (tableName, date) => {
  await deleteItem(tableName, 'Datum', date);
};

module.exports = {
  getEvenings,
  getEveningWithDate,
  createEvening,
  updateEveningwithDate,
  deleteEveningWithDate,
};
