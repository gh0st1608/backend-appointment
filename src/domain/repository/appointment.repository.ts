import { Appointment } from '../entities/appointment.entity';

export interface IDynamoAppointmentRepository {
  save(appointment: Appointment): Promise<string>;
}

export interface IRDSAppointmentRepository {
  save(appointment: Appointment): Promise<void>;
}

export const DynamoAppointmentSymbol = Symbol('IDynamoAppointmentRepository');
export const RDSAppointmentSymbol = Symbol('IRDSAppointmentRepository');
