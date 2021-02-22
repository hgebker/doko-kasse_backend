const { scan, getItem, putItem, updateItem, deleteItem } = require('../../clients/ddbClient');
const { formatItem } = require('./formatter');

const getEvenings = async (tableName, semester) => {
  let scanParams;

  if (semester) {
    scanParams = {
      ScanFilter: {
        semester: {
          ComparisonOperator: 'EQ',
          AttributeValueList: [semester],
        },
      },
    };
  }

  const evenings = await scan(tableName, scanParams);

  return evenings.map(formatItem).sort(({ Datum: a }, { Datum: b }) => (a > b) - (b > a));
};

const getEveningWithDate = async (tableName, date) => {
  const evening = await getItem(tableName, { Datum: date });

  return evening;
};

const createEvening = async (tableName, evening) => {
  await putItem(tableName, evening);
};

const updateEveningwithDate = async (tableName, date, evening) => {
  await updateItem(tableName, { Datum: date }, evening);
};

const deleteEveningWithDate = async (tableName, date) => {
  await deleteItem(tableName, { Datum: date });
};

module.exports = {
  getEvenings,
  getEveningWithDate,
  createEvening,
  updateEveningwithDate,
  deleteEveningWithDate,
};
