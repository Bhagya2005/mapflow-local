import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import serverless from 'serverless-http';

let cachedServer;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();
  return serverless(app.getHttpAdapter().getInstance());
}

export default async function handler(req, res) {
  if (!cachedServer) {
    cachedServer = await bootstrap();
  }
  return cachedServer(req, res);
}