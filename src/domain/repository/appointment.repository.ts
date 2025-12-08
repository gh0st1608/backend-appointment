import { Appointment, CountryISO } from '../entities/appointment.entity';

export interface IDynamoAppointmentRepository {
  save(appointment: Appointment): Promise<string>;
  findOne(id: string): Promise<Appointment>;
}

export interface IRDSAppointmentRepository {
  save(appointment: Appointment): Promise<void>;
  existsByInsured(insuredId: string, scheduleId: number, countryISO: CountryISO): Promise<boolean>;
}

export const DynamoAppointmentSymbol = Symbol('IDynamoAppointmentRepository');
export const RDSAppointmentSymbol = Symbol('IRDSAppointmentRepository');
