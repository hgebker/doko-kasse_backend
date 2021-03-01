const { DocumentClient } = require('aws-sdk/clients/dynamodb');
const dbClient = new DocumentClient();

const prepareAttributeExpression = entries => {
  const preparedEntries = entries.filter(([, value]) => !!value);
  const expressionParts = preparedEntries.map(([key]) => `${key} = :${key}`);

  if (!preparedEntries.length) {
    return { expression: null, attributeValues: null };
  }

  return {
    expression: expressionParts.join(', '),
    attributeValues: preparedEntries.reduce(
      (currentValues, [key, value]) => ({ ...currentValues, [`:${key}`]: value }),
      {}
    ),
  };
};

const scanTable = async (tableName, scanFilter) => {
  const params = {
    TableName: tableName,
  };

  if (scanFilter) {
    const { expression, attributeValues } = prepareAttributeExpression(Object.entries(scanFilter));

    params.FilterExpression = expression;
    params.ExpressionAttributeValues = attributeValues;
  }

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
  const entries = Object.entries(updatedItem).filter(([key]) => key !== keyName);
  const { expression, attributeValues } = prepareAttributeExpression(entries);

  const params = {
    TableName: tableName,
    Key: {
      [keyName]: updatedItem[keyName],
    },
    UpdateExpression: `set ${expression}`,
    ExpressionAttributeValues: attributeValues,
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
