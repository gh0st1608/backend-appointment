import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppointmentController } from './infrastructure/controllers/appointment.controller';
import { DynamoRepository } from './infrastructure/repository/dynamo.repository';
import { ScheduleAppointmentUseCase } from './application/use-cases/schedule-appointment.application';
import {
  DynamoAppointmentSymbol,
  RDSAppointmentSymbol,
} from './domain/repository/appointment.repository';
import { RdsRepository } from './infrastructure/repository/rds.repository';
import {
  EBAppointmentEventPublisherSymbol,
  SNSAppointmentEventPublisherSymbol,
} from './domain/repository/event.repository';
import { SNSAppointmentPublisher } from './infrastructure/repository/sns.repository';
import { EBAppointmentPublisher } from './infrastructure/repository/eventbridge.repository';
import { ScheduleAppointmentPEUseCase } from './application/use-cases/schedule-appointment-pe.application';
import { ScheduleAppointmentCLUseCase } from './application/use-cases/schedule-appointment-cl.application';
import { AppointmentPendingControllerConsumer } from './infrastructure/consumers/appointment-pending.consumer';
import { AppointmentConfirmationControllerConsumer } from './infrastructure/consumers/appointment-confirmation.consumer';
import { UpdateStatusAppointmentUseCase } from './application/use-cases/update-appointment.application';
import { GetAppointmentByIdUseCase } from './application/use-cases/get-appointment.application';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV || ''}.env`,
      isGlobal: true,
    }),
  ],
  controllers: [AppointmentController],
  providers: [
    {
      provide: DynamoAppointmentSymbol,
      useClass: DynamoRepository,
    },
    {
      provide: RDSAppointmentSymbol,
      useClass: RdsRepository,
    },
    {
      provide: SNSAppointmentEventPublisherSymbol,
      useClass: SNSAppointmentPublisher,
    },
    {
      provide: EBAppointmentEventPublisherSymbol,
      useClass: EBAppointmentPublisher,
    },
    ScheduleAppointmentUseCase,
    ScheduleAppointmentPEUseCase,
    ScheduleAppointmentCLUseCase,
    UpdateStatusAppointmentUseCase,
    GetAppointmentByIdUseCase,
    AppointmentPendingControllerConsumer,
    AppointmentConfirmationControllerConsumer
  ],
})
export class AppointmentModule {}
