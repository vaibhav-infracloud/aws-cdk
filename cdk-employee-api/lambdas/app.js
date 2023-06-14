const AWS = require('aws-sdk');
let dynamo = new AWS.DynamoDB.DocumentClient();

const MY_TABLE = process.env.MY_TABLE;

exports.handler = async(event,context) => {

    console.log("EVENT:::", event);
    let path = event.resource;
    let httpMethod = event.httpMethod;
    // Fetching the request type and the path 
    let route = httpMethod.concat(" ").concat(path);
    let data = JSON.parse(event.body);

    let body;
    let statusCode = 200;

    try {
        // Switch case block to map the requests to the corresponding functions
        switch(route) {
            case "GET /info" : 
                body = await listInfo()
                break;
            case "POST /info":
                body = await saveInfo(data)
                break;
            case "DELETE /info/{id}":
                body = await deleteInfo(event.pathParameters.id)
                break;
            case "PUT /info/{id}":
                body = await updateInfo(event.pathParameters.id, data)
                break;
            case "GET /info/{id}":
                body = await getInfo(event.pathParameters.id)
                break;

            
            default:
                throw new Error(`Unsupported route: "${route}` )
        }
    } catch (error) {

        console.log(error);
        statusCode = 400;
        body = error.message

        
    } finally {
        console.log(body);
        body = JSON.stringify(body)

    }
    return sendRes(statusCode, body);

};

// Function to list all the employees information
async function listInfo() {

    const params = {
        TableName: MY_TABLE
    };
    return dynamo
            .scan(params)
            .promise()
            .then((data) => {
                return data.Items;
            })
}

// Function to save information for the employee in dynamo-db
async function saveInfo(data) {

    const date = new Date();
    const time = date.getTime();

    const info = {
        id : time.toString(),
        ename: data.ename,
        address: data.address

    };

    const params = {
        TableName: MY_TABLE,
        Item: info
    }

    return dynamo
            .put(params)
            .promise()
            .then(() => {
                return info;

            })
}

// function to delete the employee info from the dynamo db table
async function deleteInfo(id) {

    const params = {
        TableName: MY_TABLE,
        Key : {
            id: id
        }
    }

    return dynamo
            .delete(params)
            .promise()
            .then(()=> {
                return id;
            });
}

// Function the update the employee in the dynamo-db table
async function updateInfo(id, data) {
    const datetime = new Date().toISOString();

    const params = {
        TableName: MY_TABLE,
        Key : {
            id: id
        },
        ExpressionAttributeValues: {
            ":ename" : data.ename,
            ":address": data.address,
            ":updatedAt": datetime,

        },
        UpdateExpression: "SET ename = :ename, address = :address, updatedAt = :updatedAt",
        ReturnValues: "UPDATED_NEW"
    };

    return dynamo
            .update(params)
            .promise()
            .then(() => { 
                return "Item updated!"
            })

}

// Function to get info for a particular employee based on the id
async function getInfo(id) {
    const params = {
        TableName: MY_TABLE,
        Key: {
            id: id,
        },
    };

    return dynamo
            .get(params)
            .promise()
            .then((item) => {
                return item.Item
            })
}
const sendRes = (status, body) => {
    var response = {
        statusCode: status,
        headers: {
            "Content-Type": "application/json"
        },
        body
    }
    return response; 
}