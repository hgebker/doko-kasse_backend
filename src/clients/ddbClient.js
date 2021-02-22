const { DocumentClient } = require('aws-sdk/clients/dynamodb');
const dbClient = new DocumentClient();

const scan = async (TableName, ScanParams) => {
  const results = await dbClient.scan({ TableName, ...ScanParams }).promise();
  return results.Items;
};

const getItem = async (TableName, Key) => {
  const result = await dbClient.get({ TableName, Key }).promise();
  return result.Item || null;
};

const putItem = async (TableName, Item) => {
  await dbClient.put({ TableName, Item }).promise();
};

const updateItem = async (TableName, Key, Item) => {
  const UpdateExpression = Object.keys(Item).reduce((currentExpression, key) => {
    currentExpression += `${key} = :${key}, `;

    return currentExpression;
  }, 'set ');

  const ExpressionAttributeValues = Object.entries(Item).reduce((currentValues, [key, value]) => {
    currentValues[`:${key}`] = value;
  }, {});

  await dbClient.update({ TableName, Key, UpdateExpression, ExpressionAttributeValues }).promise();
};

const deleteItem = async (TableName, Key) => {
  await dbClient.delete({ TableName, Key }).promise();
};

module.exports = {
  scan,
  getItem,
  putItem,
  updateItem,
  deleteItem,
};
