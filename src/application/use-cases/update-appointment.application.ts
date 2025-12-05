import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  DynamoAppointmentSymbol,
  IDynamoAppointmentRepository,
} from '../../domain/repository/appointment.repository';

import { Appointment } from '../../domain/entities/appointment.entity';
import { AppointmentConfirmedEvent } from '../../domain/interfaces/appointment-event.interface';
import { HttpStatusResponse } from '../../domain/constants/http-code';
import { DomainSuccessMessages } from '../../domain/constants/messages';
import { AppointmentNotFoundException } from '../exceptions/appointment-not-found.exception';

@Injectable()
export class UpdateStatusAppointmentUseCase {
  constructor(
    @Inject(DynamoAppointmentSymbol)
    private readonly dynamoRepo: IDynamoAppointmentRepository,
  ) {}

  async execute(
    payload: AppointmentConfirmedEvent,
  ): Promise<{ message: string; statusCode: number }> {
    try {
      const { appointmentId } = payload;

      // 1. Buscar la cita en Dynamo
      const appointment = await this.dynamoRepo.findOne(appointmentId);

      if (!appointment) {
        throw new AppointmentNotFoundException
      }

      // 2. Actualizar estado
      appointment.confirm();

      // 3. Guardar cambios
      await this.dynamoRepo.save(appointment);

      return {
        message: DomainSuccessMessages.COMPLETED_APPOINTMENT_SUCCESS,
        statusCode: HttpStatusResponse.OK,
      };
    } catch (error) {
      throw error;
    }
  }
}
