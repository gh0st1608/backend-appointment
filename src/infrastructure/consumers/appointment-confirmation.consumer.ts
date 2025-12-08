import { Injectable, Logger } from '@nestjs/common';
import { SQSEvent } from 'aws-lambda';
import { UpdateStatusAppointmentUseCase } from '../../application/use-cases/update-appointment.application';

@Injectable()
export class AppointmentConfirmationControllerConsumer {
  private readonly logger = new Logger(
    AppointmentConfirmationControllerConsumer.name,
  );

  constructor(
    private readonly updateStatusAppointmentUseCase: UpdateStatusAppointmentUseCase,
  ) {}

  async handle(event: SQSEvent): Promise<void> {
    for (const record of event.Records) {
      try {
        this.logger.log(`Processing SQS record: ${record.messageId}`);

        const rawBody = JSON.parse(record.body);
        const detail = rawBody.detail;

        this.logger.log(`Event detail: ${JSON.stringify(detail)}`);

        await this.updateStatusAppointmentUseCase.execute({
          appointmentId: detail.appointmentId,
          insuredId: detail.insuredId,
          scheduleId: detail.scheduleId,
          countryISO: detail.countryISO,
          state: detail.state,
        });

        this.logger.log(
          `✔ Updated appointment for insuredId=${detail.insuredId}`,
        );
      } catch (err) {
        this.logger.error(`❌ Error processing record`, err);
        throw err;
      }
    }
  }
}
