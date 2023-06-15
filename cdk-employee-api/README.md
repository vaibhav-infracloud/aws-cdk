# Employee API using AWS CDK

The Employee API project is a serverless application developed using AWS CDK (Cloud Development Kit) that allows users to store and retrieve employee information through a RESTful API. The project leverages various AWS services such as API Gateway, Lambda function, and DynamoDB to provide a scalable and reliable solution for managing employee data.

## Architecture

The application architecture consists of three main components:

  1. <b>API Gateway</b>: This component serves as the entry point for incoming HTTP requests. It handles API request routing and integrates with Lambda functions to execute the corresponding business logic.
  2. <b>Lambda Function</b>: The Lambda function is responsible for processing the API requests received from the API Gateway. It performs the necessary operations, such as creating, reading, updating, or deleting employee records, based on the request payload. The Lambda function interacts with the DynamoDB table to store or retrieve employee data.
  3. <b>DynamoDB Table</b>: DynamoDB is a fully managed NoSQL database service provided by AWS. The DynamoDB table is accessed by the Lambda function to perform CRUD operations on employee data.

## Pre-requisites

Before proceeding with the installation and setup, ensure you have the following prerequisites:

  1. AWS account credentials with appropriate permissions to create and manage resources.
  2. AWS CLI (Command Line Interface) is installed and configured on your local machine.
  3. Node.js and npm (Node Package Manager) installed.

## Installation and Setup

1. Clone the repository.

   ```sh
   git clone https://github.com/vaibhav-infracloud/aws-cdk.git
   cd cdk-employee-api/
   ```
   
2. Install project dependencies<br>
    ```sh
    npm install
    ```
    
## Project Structure

The project structure follows the standard AWS CDK project layout. The main files and directories are as follows:

1. <b>lib/cdk-employee-api-stack.ts</b>: This file defines the CDK stack for deploying the Employee API infrastructure. 

2. <b>lambdas/app.js</b>: This file contains the Lambda function code for processing API requests and interacting with the DynamoDB table.

3. <b>test/cdk-employee-api.test.ts</b>: This file contains the assertion test cases to make sure that the required attributes are set for the AWS resources.

## Deployment

To deploy the Employee API project run the below commands:

1. Build the project

   ```sh
   npm run build
   ```
   
2. Run the test cases
   
    ```sh
    npm run test
    ```   
3. Deploy the Stack
   
    ```sh
    cdk deploy
    ```
    
## API Endpoints

The following API endpoints are available for managing employee data:

1. <b>GET /info</b>: Retrieve a list of all employees.
2. <b>GET /info/{id}</b>: Retrieve details of a specific employee by their ID.
3. <b>POST /info</b>: Create a new employee record.
4. <b>PUT /info/{id}</b>: Update an existing employee record.
5. <b>DELETE /info/{id}</b>: Delete an employee record.

## JSON Payload

To perform create or update operation for employee records, a JSON object would be required that should be in the following format:

```json
{
  "ename" : "<Name of the Employee>",
  "address": "<Address of the Employee>"
}
  
```
Note: The employee id is generated dynamically during the create operation

## Testing

To test the Employee API, you can use tools like cURL or Postman to send HTTP requests to the API endpoints. Ensure that you have the necessary request payloads and include the appropriate headers (Content-Type: application/json).

You can also use the AWS API gateway console to test the API

## Troubleshooting

If you encounter any issues during the installation, setup, or deployment process, refer to the following troubleshooting steps:

1. Ensure that you have the latest version of Node.js and npm installed.
2. Double-check your AWS CLI configuration and permissions.
3. Verify that the required dependencies are properly installed by running npm install.
4. Check the AWS CDK documentation

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with the current state
* `cdk synth`       emits the synthesized CloudFormation template
