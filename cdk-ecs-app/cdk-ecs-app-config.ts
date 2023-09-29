export const services = [
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
