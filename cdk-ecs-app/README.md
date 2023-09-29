# AWS ECS Deployment

This CDK application spins up an infra ( VPC, subnets, ECS Cluster ) and deploys the required container image as an ECS service, exposing it via ALB.

## Pre-requisites

Before proceeding with the installation and setup, ensure you have the following prerequisites:

  1. AWS account credentials with appropriate permissions to create and manage resources.
  2. AWS CLI (Command Line Interface) is installed and configured on your local machine.
  3. Node.js (LTS version) and npm (Node Package Manager) installed.

## Installation and Setup

1. Clone the repository.

   ```sh
   git clone https://github.com/vaibhav-infracloud/aws-cdk.git
   cd cdk-ecs-app/
   ```
   
2. Install project dependencies<br>
    ```sh
    npm install
    ```
## Variable Configuration

Set the appropriate values for the services to be deployed on ECS in file **cdk-ecs-app-config.ts**.
Below is an example for the same:
```
{
  image_name : "public.ecr.aws/docker/library/httpd:latest",
  container_port : 80,
  alb_listener_port : 8081,
  desired_count : 2,
  memory : '512', // in Mb
  cpu : '256'
 }
```
## Deployment

To deploy the required docker application on AWS ECS run the below commands:

1. Build the project

   ```sh
   npm run build
   ``` 
2. Deploy the Stack
   
    ```sh
    cdk deploy
    ```
    
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
