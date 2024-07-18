import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from 'uuid';

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

const groupsTable = process.env.GROUPS_TABLE;

export async function handler(event) {
    console.log('Processing event: ', event)
    const itemId = uuidv4()
    const parsedBody = JSON.parse(event.body);
    const item = {
        id: itemId,
        name: parsedBody.name || '',
        description: parsedBody.description || ''
    }

    const command = new PutCommand({
        TableName: groupsTable,
        Item: item
    });

    const response = await ddbDocClient.send(command);

    console.log(response);

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            newItem: item
        })
    };
}