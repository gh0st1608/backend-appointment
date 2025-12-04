import { Injectable } from '@nestjs/common';
import {
  EventBridgeClient,
  PutEventsCommand,
} from '@aws-sdk/client-eventbridge';
import {
  IEBAppointmentEventPublisher,
} from '../../domain/repository/event.repository';
import {
  AppointmentConfirmedEvent,
} from '../../domain/interfaces/appointment-event.interface';

@Injectable()
export class EBAppointmentPublisher
  implements IEBAppointmentEventPublisher
{
  private readonly client = new EventBridgeClient({
    region: process.env.REGION,
  });

  async publishAppointmentConfirmed(
    event: AppointmentConfirmedEvent,
  ): Promise<void> {
    const command = new PutEventsCommand({
      Entries: [
        {
          Source: 'appointment.service',
          DetailType: 'AppointmentConfirmed',
          Detail: JSON.stringify(event),
          EventBusName: process.env.APPOINTMENT_EVENT_BUS,
        },
      ],
    });

    await this.client.send(command);
  }
}
