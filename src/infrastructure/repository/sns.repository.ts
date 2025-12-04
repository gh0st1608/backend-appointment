import { Injectable } from '@nestjs/common';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import {
  ISNSAppointmentEventPublisher,
} from '../../domain/repository/event.repository';
import { AppointmentCreatedEvent } from '../../domain/interfaces/appointment-event.interface';

@Injectable()
export class SNSAppointmentPublisher implements ISNSAppointmentEventPublisher
{
  private readonly client = new SNSClient({ region: process.env.REGION });

  async publishAppointmentCreated(event: AppointmentCreatedEvent): Promise<void> {
    await this.client.send(
      new PublishCommand({
        TopicArn: process.env.APPOINTMENT_CREATED_TOPIC_ARN,
        Message: JSON.stringify(event),
        MessageAttributes: {
          countryISO: {
            DataType: 'String',
            StringValue: event.countryISO,
          },
        },
      }),
    );
  }
}
