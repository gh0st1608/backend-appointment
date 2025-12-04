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

@Injectable()
export class ScheduleAppointmentPEUseCase {
  private readonly logger = new Logger(ScheduleAppointmentPEUseCase.name);

  constructor(
    @Inject(RDSAppointmentSymbol)
    private readonly rdsRepo: IRDSAppointmentRepository,

    @Inject(EBAppointmentEventPublisherSymbol)
    private readonly eventPublisher: IEBAppointmentEventPublisher,
  ) {}

  async execute(payload: AppointmentPayload): Promise<void> {
    if (!payload) {
      throw new Error('Payload inválido');
    }

    const schedule = Schedule.create({
      scheduleId: payload.schedule.scheduleId,
      centerId: payload.schedule.centerId,
      specialtyId: payload.schedule.specialtyId,
      medicId: payload.schedule.medicId,
      date: payload.schedule.date,
    });

    // 1️⃣ Crear la entidad desde el factory method
    const appointment = Appointment.create({
      insuredId: payload.insuredId,
      schedule,
      countryISO: payload.countryISO,
    });

    // 2️⃣ Marcar como confirmado
    appointment.confirm();

    this.logger.log(
      `Procesando agendamiento PE: appointmentId=${
        appointment.properties().appointmentId
      }`,
    );

    // 3️⃣ Guardar en RDS
    await this.rdsRepo.save(appointment);

    // 4️⃣ Enviar evento tipado
    const event: AppointmentConfirmedEvent = {
      insuredId: appointment.properties().insuredId,
      scheduleId: appointment.properties().schedule.properties().scheduleId,
      countryISO: appointment.properties().countryISO,
      state: 'confirmed',
    };

    await this.eventPublisher.publishAppointmentConfirmed(event);
  }
}
