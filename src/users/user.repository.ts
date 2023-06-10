import * as AWS from 'aws-sdk';
import { InternalServerErrorException } from '@nestjs/common';

const region = 'ap-northeast-1';
const client = new AWS.DynamoDB({ region });
client.listTables({}, (err, data) => {
  if (err) console.log(err, err.stack);
  else console.log(data);
});

const dynamoCreateParams = {
  TableName: 'test_users',
  KeySchema: [{ AttributeName: 'access_key', KeyType: 'HASH' }],
  AttributeDefinitions: [{ AttributeName: 'access_key', AttributeType: 'S' }],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
};

export class UserRepository {
  private tableName = 'test_users';

  async createTable(): Promise<AWS.DynamoDB.DocumentClient.CreateTableOutput> {
    return await client.createTable(dynamoCreateParams).promise();

    // client.createTable(dynamoCreateParams, function (err, data) {
    //   if (err) {
    //     console.error(
    //       'Unable to create tableかなしい. Error JSON:',
    //       JSON.stringify(err),
    //     );
    //     return 1;
    //   } else {
    //     console.log(
    //       'Created table. Table description JSONくやしい:',
    //       JSON.stringify(data),
    //     );
    //     return 2;
    //   }
    //   return 3;
    // });
  }

  async create(user): Promise<AWS.DynamoDB.DocumentClient.UpdateItemOutput> {
    let updateExpression = 'set ';
    const expressionAttributeValues = {} as any;
    const expressionAttributeNames = {} as any;
    for (const [key, value] of Object.entries(user)) {
      if (!(key === 'name')) {
        updateExpression += `#${key} = :${key}, `;
        expressionAttributeValues[`:${key}`] = value;
        expressionAttributeNames[`#${key}`] = `${key}`;
      }
    }
    updateExpression = updateExpression.slice(0, -2);

    try {
      return await new AWS.DynamoDB.DocumentClient()
        .update({
          TableName: this.tableName,
          Key: {
            name: user.name,
          },
          UpdateExpression: updateExpression,
          ExpressionAttributeValues: expressionAttributeValues,
          ExpressionAttributeNames: expressionAttributeNames,
          ReturnValues: 'ALL_NEW',
        })
        .promise();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAll(): Promise<AWS.DynamoDB.DocumentClient.ScanOutput> {
    return await client
      .scan({
        TableName: this.tableName,
      })
      .promise();
  }
}
