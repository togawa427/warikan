// import * as AWS from 'aws-sdk';
import { InternalServerErrorException } from '@nestjs/common';
import { DynamoDB, ListTablesCommand } from '@aws-sdk/client-dynamodb';

const region = 'us-west-2';
const client = new DynamoDB({ region });
// const dbClient = new DynamoDBClient({
//   endpoint: 'http://localhost:8000',
// });
client.listTables({}, (err, data) => {
  if (err) console.log(err, err.stack);
  else console.log(data);
});

export class UserRepository {
  private tableName = 'Music';

  //   async create(user): Promise<AWS.DynamoDB.DocumentClient.UpdateItemOutput> {
  //     let updateExpression = 'set ';
  //     const expressionAttributeValues = {} as any;
  //     const expressionAttributeNames = {} as any;
  //     for (const [key, value] of Object.entries(user)) {
  //       if (!(key === 'name')) {
  //         updateExpression += `#${key} = :${key}, `;
  //         expressionAttributeValues[`:${key}`] = value;
  //         expressionAttributeNames[`#${key}`] = `${key}`;
  //       }
  //     }
  //     updateExpression = updateExpression.slice(0, -2);

  //     try {
  //       return await new AWS.DynamoDB.DocumentClient()
  //         .update({
  //           TableName: this.tableName,
  //           Key: {
  //             name: user.name,
  //           },
  //           UpdateExpression: updateExpression,
  //           ExpressionAttributeValues: expressionAttributeValues,
  //           ExpressionAttributeNames: expressionAttributeNames,
  //           ReturnValues: 'ALL_NEW',
  //         })
  //         .promise();
  //     } catch (error) {
  //       throw new InternalServerErrorException(error);
  //     }
  //   }

  //   async getAll(): Promise<AWS.DynamoDB.DocumentClient.ScanOutput> {
  //     return await new AWS.DynamoDB.DocumentClient()
  //       .scan({
  //         TableName: this.tableName,
  //       })
  //       .promise();
  //   }

  async getAll() {
    try {
      const command = new ListTablesCommand({});
      const output = await client.send(command);
      if (output.TableNames) {
        console.log(output.TableNames.join(', '));
      }
      console.log(output);
    } catch (err) {
      console.error('ERROR', err);
    }
  }

  //   async getAll(): Promise<AWS.DynamoDB.DocumentClient.ScanOutput> {
  //     // const client = new DynamoDBClient();
  //     const command = new ScanCommand({
  //       TableName: this.tableName,
  //     });

  //     try {
  //       const response = await client.send(command);
  //       // レスポンスのマーシャリング（必要に応じて行う）
  //       const items = response.Items?.map((item) => unmarshall(item));
  //       return { Items: items };
  //     } catch (error) {
  //       throw new InternalServerErrorException(
  //         'Failed to fetch items from DynamoDB.',
  //       );
  //     }
  //   }
}
