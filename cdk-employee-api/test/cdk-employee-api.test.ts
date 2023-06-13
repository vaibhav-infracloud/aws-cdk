import { expect as expectCDK, haveResource, haveResourceLike } from '@aws-cdk/assert';
import * as cdk from 'aws-cdk-lib';
import * as MyStack from '../lib/cdk-employee-api-stack';

const app = new cdk.App();
const stack = new MyStack.CdkEmployeeApiStack(app, 'MyStack');



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
 test("Lambda function has correct runtime set as NODEJS_16_X", () => {

    // Assert that the Lambda function has the correct runtime
    expectCDK(stack).to(
      haveResourceLike('AWS::Lambda::Function', {
        Runtime: 'nodejs16.x',
      })
    );
  });

// Test case 4
test("API Gateway has all required HTTP methods configured", () => {
    expectCDK(stack).to(
      haveResource('AWS::ApiGateway::Method', {
        HttpMethod: 'GET'
      })
    );
  
    expectCDK(stack).to(
      haveResource('AWS::ApiGateway::Method', {
        HttpMethod: 'POST'
      })
    );
  
    expectCDK(stack).to(
      haveResource('AWS::ApiGateway::Method', {
        HttpMethod: 'DELETE'
      })
    );
  
    expectCDK(stack).to(
      haveResource('AWS::ApiGateway::Method', {
        HttpMethod: 'PUT'
      })
    );
  });
 
  
    