import {
  DynamoDBClient,
  ScanCommand,
  ScanCommandInput,
  GetItemCommand,
  PutItemCommand,
  UpdateItemCommand,
  DeleteItemCommand,
} from '@aws-sdk/client-dynamodb';

type ScanFilter = {
  [x: string]: string;
};

interface AttributeExpression {
  FilterExpression?: string;
  ExpressionAttributeValues?: {
    [x: string]: any;
  };
}

const dbClient = new DynamoDBClient({ region: process.env.AWS_REGION });

const prepareAttributeExpression = (entries: [string, any][]): AttributeExpression => {
  const preparedEntries = entries.filter(([, value]) => !!value);
  const expressionParts = preparedEntries.map(([key]) => `${key} = :${key}`);

  if (!preparedEntries.length) {
    return { FilterExpression: null, ExpressionAttributeValues: null };
  }

  return {
    FilterExpression: expressionParts.join(', '),
    ExpressionAttributeValues: preparedEntries.reduce(
      (currentValues, [key, value]) => ({ ...currentValues, [`:${key}`]: value }),
      {}
    ),
  };
};

const scanTable = async <T extends {}>(tableName: string, scanFilter?: ScanFilter): Promise<T[]> => {
  const params: ScanCommandInput = {
    TableName: tableName,
  };

  if (scanFilter) {
    const { FilterExpression, ExpressionAttributeValues } = prepareAttributeExpression(Object.entries(scanFilter));

    params.FilterExpression = FilterExpression;
    params.ExpressionAttributeValues = ExpressionAttributeValues;
  }

  const { Items } = await dbClient.send(new ScanCommand(params));
  return Items as T[];
};

const getItem = async <T extends {}>(tableName: string, keyName: string, keyValue: any): Promise<T | null> => {
  const params = {
    TableName: tableName,
    Key: {
      [keyName]: keyValue,
    },
  };
  const { Item } = await dbClient.send(new GetItemCommand(params));

  return (Item as T) || null;
};

const putItem = async (tableName: string, newItem: any) => {
  const params = {
    TableName: tableName,
    Item: newItem,
  };

  return await dbClient.send(new PutItemCommand(params));
};

const updateItem = async (tableName: string, keyName: string, updatedItem: any) => {
  const entries = Object.entries(updatedItem).filter(([key]) => key !== keyName);
  const { FilterExpression, ExpressionAttributeValues } = prepareAttributeExpression(entries);

  const params = {
    TableName: tableName,
    Key: {
      [keyName]: updatedItem[keyName],
    },
    UpdateExpression: `set ${FilterExpression}`,
    ExpressionAttributeValues,
  };

  return await dbClient.send(new UpdateItemCommand(params));
};

const deleteItem = async (tableName: string, keyName: string, keyValue: any) => {
  const params = {
    TableName: tableName,
    Key: {
      [keyName]: keyValue,
    },
  };

  return await dbClient.send(new DeleteItemCommand(params));
};

export { scanTable, getItem, putItem, updateItem, deleteItem };
