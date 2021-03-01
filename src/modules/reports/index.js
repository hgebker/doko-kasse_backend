const { calculateSemesterReport, calculateCashReport } = require('./calculations');
const { scanTable } = require('../../clients/ddbClient');

const getSemesterReport = async (tableName, semesterKey) => {
  const evenings = await scanTable(tableName, { semester: semesterKey });

  if (evenings.length) {
    return calculateSemesterReport(evenings);
  } else {
    return null;
  }
};

const getCashReport = async (eveningsTable, expensesTable) => {
  const evenings = await scanTable(eveningsTable);
  const expenses = await scanTable(expensesTable);

  if (evenings.length) {
    return calculateCashReport(evenings, expenses);
  } else {
    return null;
  }
};

module.exports = { getSemesterReport, getCashReport };
