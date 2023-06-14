import {RemovalPolicy, Stack, StackProps} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Code, Function, Runtime  } from 'aws-cdk-lib/aws-lambda';
import { RestApi } from 'aws-cdk-lib/aws-apigateway';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { join } from 'path';
import {AttributeType, BillingMode, Table} from 'aws-cdk-lib/aws-dynamodb';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkEmployeeApiStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

      // Creating a dyanamo-db table 
      const table = new Table(this, "info-tbl" , {
        partitionKey: {name: 'id', type: AttributeType.STRING},
        billingMode: BillingMode.PAY_PER_REQUEST,
        removalPolicy: RemovalPolicy.DESTROY

      });

      // Creating a lambda function 
      const handlerFunction = new Function(this, 'infoHandler', {
        runtime: Runtime.NODEJS_16_X,
        code: Code.fromAsset(join(__dirname, '../lambdas')),
        handler: 'app.handler',
        environment: {
          MY_TABLE: table.tableName
        }
      });

    // Grant permission to lambda function to read and write to dynamo-db table
    table.grantReadWriteData(handlerFunction);

    // Creating a Api gateway
    const api = new RestApi(this, 'info-api', {
      description: 'Employee Info API',
    });

    // Integrating the API gateway with the lambda function
    const handlerIntegration = new apigateway.LambdaIntegration(handlerFunction);

    const mainPath = api.root.addResource("info"); // Adding /info to the request route

    const idPath = mainPath.addResource("{id}") // id will change during run time

    mainPath.addMethod("GET", handlerIntegration); // Get all employee info
    mainPath.addMethod("POST", handlerIntegration); // Post an employee info
    
    idPath.addMethod("DELETE", handlerIntegration); // Delete an employee info
    idPath.addMethod("GET", handlerIntegration); // Get an employee info
    idPath.addMethod("PUT", handlerIntegration); // Update an employee info

  }
}
