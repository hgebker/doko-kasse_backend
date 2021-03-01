import { DocumentClient, ScanInput } from 'aws-sdk/clients/dynamodb';
const dbClient = new DocumentClient();

type ScanFilter = {
  [x: string]: string;
};

const prepareAttributeExpression = (entries: [string, any][]) => {
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

const scanTable = async <T extends {}>(tableName: string, scanFilter: ScanFilter): Promise<T[]> => {
  const params: ScanInput = {
    TableName: tableName,
  };

  if (scanFilter) {
    const { expression, attributeValues } = prepareAttributeExpression(Object.entries(scanFilter));

    params.FilterExpression = expression;
    params.ExpressionAttributeValues = attributeValues;
  }

  const { Items } = await dbClient.scan(params).promise();
  return Items as T[];
};

const getItem = async <T extends {}>(tableName: string, keyName: string, keyValue: any): Promise<T | null> => {
  const params = {
    TableName: tableName,
    Key: {
      [keyName]: keyValue,
    },
  };
  const { Item } = await dbClient.get(params).promise();

  return (Item as T) || null;
};

const putItem = async (tableName: string, newItem: any) => {
  const params = {
    TableName: tableName,
    Item: newItem,
  };

  return await dbClient.put(params).promise();
};

const updateItem = async (tableName: string, keyName: string, updatedItem: any) => {
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

  return await dbClient.update(params).promise();
};

const deleteItem = async (tableName: string, keyName: string, keyValue: any) => {
  const params = {
    TableName: tableName,
    Key: {
      [keyName]: keyValue,
    },
  };

  return await dbClient.delete(params).promise();
};

export { scanTable, getItem, putItem, updateItem, deleteItem };
