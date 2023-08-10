import {CfnOutput, Stack, StackProps} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';

// Some configurable parameters
const services = [
  {
  image_name : "public.ecr.aws/docker/library/httpd:latest",
  container_port : 80,
  alb_listener_port : 8081,
  desired_count : 2,
  memory : '512', // in Mb
  cpu : '256'
 },
 {
   image_name : "nginx:latest",
   container_port : 80,
   alb_listener_port : 8080,
   desired_count : 2,
   memory : '512', // in Mb
   cpu : '256'
 }
];

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

    // Create an Application Load Balancer
    const alb = new elbv2.ApplicationLoadBalancer(this, 'CDKALB', {
      vpc: vpc,
      internetFacing: true,
    });

    // Create a task definition
        // Create a task definition
    services.forEach((service, index ) => {

        const taskDefinition = new ecs.TaskDefinition(this,'CDKTaskDefinition_'+index, {
          compatibility: ecs.Compatibility.FARGATE,
          memoryMiB: service.memory,
          cpu: service.cpu,
        });
    
        // Add container(s) to the task definition
        taskDefinition.addContainer('CDKContainer_'+index, {
          image: ecs.ContainerImage.fromRegistry(service.image_name),
          memoryLimitMiB: parseInt(service.memory, 10),
          portMappings: [{ containerPort: service.container_port }],
        });
    
        // Create a service
        const ecsService = new ecs.FargateService(this, 'CDKService_'+index, {
          cluster: cluster,
          taskDefinition: taskDefinition,
          desiredCount: service.desired_count
        });
        
        // Create a listener for the ALB
        const listener = alb.addListener('CDKListener_'+index, {
          port: service.alb_listener_port,
          protocol: elbv2.ApplicationProtocol.HTTP,
          open: true,
        });
    
        // Attach the ECS service as a target to the ALB listener
        listener.addTargets('ECS', {
          port: service.container_port,
          targets: [ecsService],
        });

        // Output the ALB DNS name
        
    });

    new CfnOutput(this, 'ALBDNS', {
      value: alb.loadBalancerDnsName,
      description: 'ALB DNS name for service',
    });
  }
}