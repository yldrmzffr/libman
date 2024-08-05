import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const logger = app.get(Logger);

  app.useLogger(logger);

  const config = new DocumentBuilder()
    .setTitle('LibManAPI')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(8080);

  logger.log('Application is running on: http://localhost:8080');
  logger.log('Swagger is running on: http://localhost:8080/doc');
}

bootstrap();
