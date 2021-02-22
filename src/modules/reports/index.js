const { calculateReport } = require('./calculations');
const { scan } = require('../../clients/ddbClient');
const { parseSum } = require('../evenings/formatter');

const getSemesterReport = async (tableName, semesterKey) => {
  let scanParams;

  if (semesterKey) {
    scanParams = {
      ScanFilter: {
        semester: {
          ComparisonOperator: 'EQ',
          AttributeValueList: [semesterKey],
        },
      },
    };
  }

  const evenings = await scan(tableName, scanParams);

  if (evenings.length) {
    return calculateReport(evenings);
  } else {
    return null;
  }
};

const getCashReport = async tableName => {
  const evenings = await scan(tableName);
  const expenses = await scan('doko-ausgaben');

  if (evenings.length) {
    const totalIncome = evenings.reduce((total, evening) => total + parseSum(evening), 0);
    const totalExpenses = expenses.reduce((total, expense) => total + expense.wert, 0);
    const currentCash = totalIncome - totalExpenses;

    return { totalIncome, totalExpenses, currentCash };
  } else {
    return null;
  }
};

module.exports = { getSemesterReport, getCashReport };
