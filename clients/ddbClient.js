const AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-central-1' });

const {
  DynamoDB: { DocumentClient },
} = AWS;

const callback = (resolve, reject) => {
  return (error, data) => {
    if (error) {
      reject(error);
    } else if (data) {
      resolve(data);
    }
  };
};

const scan = scanParams => {
  return new Promise((resolve, reject) => {
    new DocumentClient().scan(scanParams, callback(resolve, reject));
  });
};

const put = (TableName, Item) => {
  return new Promise((resolve, reject) => {
    new DocumentClient().put({ TableName, Item }, callback(resolve, reject));
  });
};

const update = (TableName, Key, Item) => {
  const UpdateExpression = Object.keys(Item).reduce((currentExpression, key) => {
    currentExpression += `${key} = :${key}, `;

    return currentExpression;
  }, 'set ');

  const ExpressionAttributeValues = Object.entries(Item).reduce((currentValues, [key, value]) => {
    currentValues[`:${key}`] = value;
  }, {});

  return new Promise((resolve, reject) => {
    new DocumentClient().update(
      { TableName, Key, UpdateExpression, ExpressionAttributeValues },
      callback(resolve, reject)
    );
  });
};

module.exports = { scan, put, update };
