import { Injectable, Logger } from '@nestjs/common';
import { SQSEvent } from 'aws-lambda';
import { ScheduleAppointmentPEUseCase } from '../../application/use-cases/schedule-appointment-pe.application';
import { ScheduleAppointmentCLUseCase } from '../../application/use-cases/schedule-appointment-cl.application';
import { CountryISO } from '../../domain/entities/appointment.entity';

@Injectable()
export class AppointmentControllerConsumer {
  private readonly logger = new Logger(AppointmentControllerConsumer.name);

  constructor(
    private readonly scheduleAppointmentPEUseCase: ScheduleAppointmentPEUseCase,
    private readonly scheduleAppointmentCLUseCase: ScheduleAppointmentCLUseCase,
  ) {}

  async handle(event: SQSEvent, country: CountryISO): Promise<void> {
    this.logger.log(`📩 Processing queue for country: ${country}`);

    for (const record of event.Records) {
      const body = JSON.parse(record.body);

      switch (country) {
        case 'PE':
          await this.scheduleAppointmentPEUseCase.execute(body);
          break;

        case 'CL':
          await this.scheduleAppointmentCLUseCase.execute(body);
          break;

        default:
          this.logger.warn(`No processor for country ${country}`);
      }
    }
  }
}
