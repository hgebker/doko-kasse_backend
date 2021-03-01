const { calculateSemesterReport, calculateCashReport } = require('./calculations');
const { scanTable } = require('../../clients/ddbClient');

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

  const evenings = await scanTable(tableName, scanParams);

  if (evenings.length) {
    return calculateSemesterReport(evenings);
  } else {
    return null;
  }
};

const getCashReport = async tableName => {
  const evenings = await scanTable(tableName);
  const expenses = await scanTable('doko-ausgaben');

  if (evenings.length) {
    return calculateCashReport(evenings, expenses);
  } else {
    return null;
  }
};

module.exports = { getSemesterReport, getCashReport };
