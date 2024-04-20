import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('API  Documentación Proyecto Task')
    .setDescription('API Trabajo Final Task')
    .setVersion('1.0.0')
    .addServer('http://localhost:3000')
    .addTag('Auth')
    .addBearerAuth({
      description: 'Autorizacion por defecto de JWt',
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT', 
    })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
