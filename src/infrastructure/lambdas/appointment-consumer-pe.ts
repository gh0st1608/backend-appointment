import { INestApplicationContext } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SQSEvent, Context, Callback, SQSHandler } from 'aws-lambda';

import { AppointmentModule } from '../../appointment.module';
import { AppointmentPendingControllerConsumer } from '../consumers/appointment-pending.consumer';

let app: INestApplicationContext | null = null;

export const handler: SQSHandler = async (
  event: SQSEvent,
  _context: Context,
  _callback: Callback,
): Promise<void> => {
  if (!app) {
    app = await NestFactory.createApplicationContext(AppointmentModule);
  }

  const consumer = app.get(AppointmentPendingControllerConsumer);

  await consumer.handle(event, 'PE');
};
