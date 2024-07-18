import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

const groupsTable = process.env.GROUPS_TABLE;

export async function handler(event) {
    const command = new ScanCommand({
        TableName: groupsTable,
      });
    
    const response = await ddbDocClient.send(command);

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            items: response.Items
        })
    };
}