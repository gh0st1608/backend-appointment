import { Injectable } from '@nestjs/common';
import {
  EventBridgeClient,
  PutEventsCommand,
} from '@aws-sdk/client-eventbridge';
import { IEBAppointmentEventPublisher } from '../../domain/repository/event.repository';
import { AppointmentConfirmedEvent } from '../../domain/interfaces/appointment-event.interface';
import { getAwsCredentials } from '../helpers/aws-helpers';

@Injectable()
export class EBAppointmentPublisher implements IEBAppointmentEventPublisher {
  private readonly client = new EventBridgeClient({
    region: process.env.REGION,
    credentials: getAwsCredentials(),
  });

  async publishAppointmentConfirmed(
    event: AppointmentConfirmedEvent,
  ): Promise<void> {
    try {
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

      const response = await this.client.send(command);

      console.log('EventBridge response:', JSON.stringify(response, null, 2));

      if (response.FailedEntryCount && response.FailedEntryCount > 0) {
        console.error('EventBridge failed entries:', response.Entries);
      }
    } catch (error) {
      console.error('Error enviando evento a EventBridge:', error);
      throw error;
    }
  }
}
