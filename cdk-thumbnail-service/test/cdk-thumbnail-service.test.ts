import { expect as expectCDK, haveResource, haveResourceLike } from '@aws-cdk/assert';
import * as cdk from 'aws-cdk-lib';
import * as MyStack from '../lib/cdk-thumbnail-service-stack';

const app = new cdk.App();
const stack = new MyStack.CdkThumbnailServiceStack(app, 'MyStack');

// Test Case 1 
test('DynamoDB table has billing mode set to PAY_PER_REQUEST', () => {

  expectCDK(stack).to(haveResource('AWS::DynamoDB::Table', {
    BillingMode: 'PAY_PER_REQUEST'
  }));
});

// Test Case 2
test("DynamoDB table has partition key 'id'", () => {

    expectCDK(stack).to(
      haveResource('AWS::DynamoDB::Table', {
        KeySchema: [
          {
            AttributeName: 'id',
            KeyType: 'HASH',
          },
        ],
      })
    );
  });

// Test Case 3
 test("Lambda function has correct runtime set as PYTHON_3.8", () => {

    // Assert that the Lambda function has the correct runtime
    expectCDK(stack).to(
      haveResourceLike('AWS::Lambda::Function', {
        Runtime: 'python3.8',
      })
    );
  });

// Test case 4
test("API Gateway has the GET HTTP method configured", () => {
    expectCDK(stack).to(
      haveResource('AWS::ApiGateway::Method', {
        HttpMethod: 'GET'
      })
    );
  });
 