# S3 Thumbnail Creation using AWS CDK

The S3 Thumbnail Service is a serverless application that uses AWS CDK (Cloud Development Kit) to convert images uploaded to an S3 bucket into a thumbnail. It also stores the details of the resized image in a DynamoDB table. The list of all the thumbnail images can be accessed using a GET method of the API Gateway

## Architecture

The application architecture consists of three main components:

  1. <b>S3 Bucket</b>: The S3 is responsible for triggering an event notification to the Lambda function whenever an image is uploaded inside it. It also stores the thumbnail after the image is resized by the lambda function.
  2. <b>Lambda Function</b>: The Lambda function is responsible for resizing the image from the s3 bucket and storing it inside the same bucket as a thumbnail. It also stores the thumbnail information inside the dynamodb table.
  3. <b>DynamoDB Table</b>: DynamoDB is a fully managed NoSQL database service provided by AWS. The DynamoDB table is accessed by the Lambda function to store the thumbnail information.
  4. <b> API Gateway </b>: The API gateway get method is used to fetch the list of all the thumbnails stored inside the s3 bucket from the dynamodb table.

## Pre-requisites

Before proceeding with the installation and setup, ensure you have the following prerequisites:

  1. AWS account credentials with appropriate permissions to create and manage resources.
  2. AWS CLI (Command Line Interface) is installed and configured on your local machine.
  3. Node.js and npm (Node Package Manager) installed.

## Installation and Setup

1. Clone the repository.

   ```sh
   git clone https://github.com/vaibhav-infracloud/aws-cdk.git
   cd cdk-thumbnail-service/
   ```
   
2. Install project dependencies<br>
    ```sh
    npm install
    ```
    
## Project Structure

The project structure follows the standard AWS CDK project layout. The main files and directories are as follows:

1. <b>lib/cdk-thumbnail-service-stack.ts</b>: This file defines the CDK stack for deploying the S3 thumbnail service infrastructure. 

2. <b>lambdas/app.js</b>: This file contains the Lambda function code for resizing an image and uploading it to s3 after converting it to a thumbnail and interacting with the DynamoDB table.

3. <b>test/cdk-thumbnail-service.test.ts</b>: This file contains the assertion test cases to make sure that the required attributes are set for the AWS resources.

## Deployment

To deploy the S3 Thumbnail project run the below commands:

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

The following API endpoint is available for reading thumbnail data:

1. <b>GET /images</b>: Retrieve a list of all the thumbnails stored inside the S3 bucket.


## Testing

To test the thumbnail Service, you can upload an image to the s3 bucket and you must see a corresponding thumbnail with the _thumnail.png suffix being created inside the s3 bucket. You can raise the request to the API gateway endpoint to list the thumbnails.


## Troubleshooting

If you encounter any issues during the installation, setup, or deployment process, refer to the following troubleshooting steps:

1. Ensure that you have the latest version of Node.js and npm installed.
2. Double-check your AWS CLI configuration and permissions.
3. Verify that the required dependencies are properly installed by running npm install.
4. Check the AWS CDK documentation.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with the current state
* `cdk synth`       emits the synthesized CloudFormation template
