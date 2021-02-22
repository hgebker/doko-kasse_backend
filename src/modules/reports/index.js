const { calculateReport } = require('./calculations');
const { scan } = require('../../clients/ddbClient');

const getReport = async (tableName, semesterKey) => {
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

module.exports = { getReport };
