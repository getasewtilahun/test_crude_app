import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import  CorsOptions  from '@nestjs/platform-express';



async function bootstrap() {

  const corsOptions: any = {
    origin: 'http://localhost:5173', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // HTTP methods to allow
    credentials: true, // Enable credentials (cookies, authorization headers)
  };


  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);

 
}

bootstrap();
