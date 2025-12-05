import { Inject, Injectable } from '@nestjs/common';
import { Appointment } from '../../domain/entities/appointment.entity';
import {
  DynamoAppointmentSymbol,
  IDynamoAppointmentRepository,
} from '../../domain/repository/appointment.repository';
import { CreateAppointmentDataDto } from '../dto/request/create-appointment.dto';
import { Schedule } from '../../domain/entities/schedule.entity';
import { AppointmentResponse } from '../dto/response/appointment-response';
import { HttpStatusResponse } from '../../domain/constants/http-code';

import {
  ISNSAppointmentEventPublisher,
  SNSAppointmentEventPublisherSymbol,
} from '../../domain/repository/event.repository';
import { DomainSuccessMessages } from '../../domain/constants/messages';

@Injectable()
export class ScheduleAppointmentUseCase {
  constructor(
    @Inject(DynamoAppointmentSymbol)
    private readonly dynamoRepo: IDynamoAppointmentRepository,

    @Inject(SNSAppointmentEventPublisherSymbol)
    private readonly eventPublisher: ISNSAppointmentEventPublisher,
  ) {}

  async execute(
    payload: CreateAppointmentDataDto,
  ): Promise<AppointmentResponse> {
    try {
      const {
        insuredId,
        scheduleId,
        centerId,
        specialtyId,
        medicId,
        date,
        countryISO,
      } = payload.Appointment;

      const schedule = new Schedule({
        scheduleId,
        centerId,
        specialtyId,
        medicId,
        date,
      });

      const appointment = Appointment.create({
        insuredId,
        schedule,
        countryISO,
      });

      const appointmentId = await this.dynamoRepo.save(appointment);

      await this.eventPublisher.publishAppointmentCreated({
        appointmentId,
        insuredId,
        scheduleId,
        countryISO,
        createdAt: new Date().toISOString(),
      });

      return {
        message: DomainSuccessMessages.PENDING_APPOINTMENT_SUCCESS,
        statusCode: HttpStatusResponse.OK,
        appointment: { appointmentId },
      };
    } catch (error) {
      throw error;
    }
  }
}
