/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL,
    methods: 'GET,HEAD,PU,PATCH,POST,DELETE',
    Credentials: true,
  });

  const port = process.env.PORT || 8000;

  await app.listen(port);
}
bootstrap();
