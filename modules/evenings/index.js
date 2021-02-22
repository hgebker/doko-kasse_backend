const { scan, put } = require('../../clients/ddbClient');
const { formatItem } = require('./formatter');

const getEvenings = async () => {
  const scanParams = {
    TableName: 'doko-abende',
  };

  const scanResults = await scan(scanParams);

  const returnValue = scanResults.Items.map(formatItem);

  returnValue.sort((a, b) => {
    a = a.Datum;
    b = b.Datum;
    return (a > b) - (b > a);
  });

  return returnValue;
};

const createEvening = item => {
  return put('doko-abende', item);
};

module.exports = { getEvenings, createEvening };
