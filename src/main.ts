import { NestFactory } from '@nestjs/core';
import { AppointmentModule } from './appointment.module';
import { setupApp } from './setup';

async function bootstrap() {
  const app = await NestFactory.create(AppointmentModule);
  await setupApp(app);
  await app.listen(process.env.PORT ?? 3333);
}

bootstrap();
