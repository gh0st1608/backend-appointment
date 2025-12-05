import { Handler } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import serverless from 'serverless-http';
import { setupApp } from '../../setup';

import { AppointmentModule } from '../../appointment.module';

let server: Handler;

async function bootstrap() {
  const app = await NestFactory.create(AppointmentModule, { bufferLogs: true });
  await setupApp(app);
  await app.init();
  return serverless(app.getHttpAdapter().getInstance());
}

export const handler: Handler = async (event, context, callback) => {
  if (!server) {
    server = await bootstrap();
  }
  return server(event, context, callback);
};
