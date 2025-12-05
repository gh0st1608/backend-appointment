import { Injectable, Logger } from '@nestjs/common';
import { SQSEvent } from 'aws-lambda';
import { ScheduleAppointmentPEUseCase } from '../../application/use-cases/schedule-appointment-pe.application';
import { ScheduleAppointmentCLUseCase } from '../../application/use-cases/schedule-appointment-cl.application';
import { CountryISO } from '../../domain/entities/appointment.entity';
import { AppointmentPayload } from '../../domain/interfaces/appointment-event.interface';

@Injectable()
export class AppointmentControllerConsumer {
  private readonly logger = new Logger(AppointmentControllerConsumer.name);

  constructor(
    private readonly scheduleAppointmentPEUseCase: ScheduleAppointmentPEUseCase,
    private readonly scheduleAppointmentCLUseCase: ScheduleAppointmentCLUseCase,
  ) {}

  async handle(event: SQSEvent, country: CountryISO): Promise<void> {
    for (const record of event.Records) {
      const rawBody = JSON.parse(record.body);

      // SNS → SQS → Lambda
      const snsMessage = JSON.parse(rawBody.Message);

      console.log('SNS WRAPPER:', rawBody);
      console.log('REAL MESSAGE:', snsMessage);

      switch (country) {
        case 'PE':
          await this.scheduleAppointmentPEUseCase.execute(snsMessage);
          break;

        case 'CL':
          await this.scheduleAppointmentCLUseCase.execute(snsMessage);
          break;

        default:
          this.logger.warn(`No processor for country ${country}`);
      }
    }
  }
}
