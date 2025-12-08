import { Inject, Injectable, Logger } from '@nestjs/common';
import { Appointment } from '../../domain/entities/appointment.entity';
import {
  RDSAppointmentSymbol,
  IRDSAppointmentRepository,
} from '../../domain/repository/appointment.repository';

import {
  AppointmentPayload,
  AppointmentConfirmedEvent,
} from '../../domain/interfaces/appointment-event.interface';

import {
  IEBAppointmentEventPublisher,
  EBAppointmentEventPublisherSymbol,
} from '../../domain/repository/event.repository';
import { Schedule } from '../../domain/entities/schedule.entity';
import { AppointmentPayloadInvalidException } from '../exceptions/appointment-payload-invalid.exception';
import { AppointmentAlreadyExistsException } from '../exceptions/appointment-already-exists.exception';

@Injectable()
export class ScheduleAppointmentCLUseCase {
  private readonly logger = new Logger(ScheduleAppointmentCLUseCase.name);

  constructor(
    @Inject(RDSAppointmentSymbol)
    private readonly rdsRepo: IRDSAppointmentRepository,

    @Inject(EBAppointmentEventPublisherSymbol)
    private readonly eventPublisher: IEBAppointmentEventPublisher,
  ) {}

  async execute(payload: AppointmentPayload): Promise<void> {
    try {
      if (!payload) {
        throw new AppointmentPayloadInvalidException();
      }

      const alreadyExists = await this.rdsRepo.existsByInsured(
        payload.insuredId,
        payload.scheduleId,
        payload.countryISO,
      );

      if (alreadyExists) {
        throw new AppointmentAlreadyExistsException();
      }

      const schedule = Schedule.create({
        scheduleId: payload.scheduleId,
        centerId: payload.centerId,
        specialtyId: payload.specialtyId,
        medicId: payload.medicId,
        date: payload.date,
      });

      const appointment = Appointment.create({
        insuredId: payload.insuredId,
        schedule,
        countryISO: payload.countryISO,
      });

      appointment.confirm();

      this.logger.log(
        `Procesando agendamiento CL: appointmentId=${
          appointment.properties().appointmentId
        }`,
      );

      await this.rdsRepo.save(appointment);

      const event: AppointmentConfirmedEvent = {
        appointmentId: appointment.properties().appointmentId,
        insuredId: appointment.properties().insuredId,
        scheduleId: appointment.properties().schedule.properties().scheduleId,
        countryISO: appointment.properties().countryISO,
        state: 'confirmed',
      };

      await this.eventPublisher.publishAppointmentConfirmed(event);
    } catch (error) {
      throw error;
    }
  }
}
