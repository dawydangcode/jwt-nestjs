import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { throwError } from './utils/function';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const port = app.get(ConfigService).get<number>('app.port') ?? throwError();
  await app.listen(port);
}

function setupSwagger(app: INestApplication<any>) {
  const config = new DocumentBuilder()
    .setTitle('Authentication')
    .setDescription('Description')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/documentation', app, documentFactory);
}
bootstrap();
