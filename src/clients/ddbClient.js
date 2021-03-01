const { DocumentClient } = require('aws-sdk/clients/dynamodb');
const dbClient = new DocumentClient();

const scanTable = async (tableName, scanFilter) => {
  const params = {
    TableName: tableName,
    ScanFilter: scanFilter,
  };
  const { Items } = await dbClient.scan(params).promise();

  return Items || [];
};

const getItem = async (tableName, keyName, keyValue) => {
  const params = {
    TableName: tableName,
    Key: {
      [keyName]: keyValue,
    },
  };
  const { Item } = await dbClient.get(params).promise();

  return Item || null;
};

const putItem = async (tableName, newItem) => {
  const params = {
    TableName: tableName,
    Item: newItem,
  };

  await dbClient.put(params).promise();
};

const updateItem = async (tableName, keyName, updatedItem) => {
  const itemEntries = Object.entries(updatedItem).filter(([key]) => key !== keyName);
  const updateExpressionParts = itemEntries.map(([key]) => `${key} = :${key}`);
  const addAttributeForExpression = (currentValues, [key, value]) => ({ ...currentValues, [`:${key}`]: value });

  const params = {
    TableName: tableName,
    Key: {
      [keyName]: updatedItem[keyName],
    },
    UpdateExpression: `set ${updateExpressionParts.join(', ')}`,
    ExpressionAttributeValues: itemEntries.reduce(addAttributeForExpression, {}),
  };

  await dbClient.update(params).promise();
};

const deleteItem = async (tableName, keyName, keyValue) => {
  const params = {
    TableName: tableName,
    Key: {
      [keyName]: keyValue,
    },
  };

  await dbClient.delete(params).promise();
};

module.exports = {
  scanTable,
  getItem,
  putItem,
  updateItem,
  deleteItem,
};
