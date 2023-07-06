import {CfnOutput, Stack, StackProps} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';

const image_name = "public.ecr.aws/docker/library/httpd:latest"

export class CdkEcsAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Create a VPC
    const vpc = new ec2.Vpc(this, 'CDKVpc', {
      maxAzs: 2, // Specify the number of Availability Zones you want to use
    });

    // Create an ECS cluster
    const cluster = new ecs.Cluster(this, 'CDKCluster', {
      vpc: vpc,
    });

    // Create a task definition
        // Create a task definition
    const taskDefinition = new ecs.TaskDefinition(this, 'CDKTaskDefinition', {
      compatibility: ecs.Compatibility.FARGATE,
      memoryMiB: '512',
      cpu: '256',
    });

    // Add container(s) to the task definition
    taskDefinition.addContainer('CDKNginxContainer', {
      image: ecs.ContainerImage.fromRegistry(image_name),
      memoryLimitMiB: 512,
      portMappings: [{ containerPort: 80 }],
    });

    // Create a service
    const service = new ecs.FargateService(this, 'CDKService', {
      cluster: cluster,
      taskDefinition: taskDefinition,
    });

    // Create an Application Load Balancer
    const alb = new elbv2.ApplicationLoadBalancer(this, 'CDKALB', {
      vpc: vpc,
      internetFacing: true,
    });

    // Create a listener for the ALB
    const listener = alb.addListener('CDKListener', {
      port: 80,
      open: true,
    });

    // Attach the ECS service as a target to the ALB listener
    listener.addTargets('ECS', {
      port: 80,
      targets: [service],
    });

    // Output the ALB DNS name
    new CfnOutput(this, 'ALBDNS', {
      value: alb.loadBalancerDnsName,
    });
  }
}