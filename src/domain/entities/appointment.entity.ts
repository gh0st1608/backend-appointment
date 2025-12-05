import { v4 as uuidv4 } from 'uuid';
import { Schedule } from './schedule.entity';

export type CountryISO = 'PE' | 'CL';
export type AppointmentState = 'pending' | 'confirmed' | 'failed';

export interface AppointmentRequired {
  readonly insuredId: string;
  readonly schedule: Schedule;
  readonly countryISO: CountryISO;
}

export interface AppointmentOptional {
  readonly appointmentId: string;
  readonly state: AppointmentState;
  readonly createdAt: Date;
  readonly updatedAt: Date | null;
  readonly deletedAt: Date | null;
}

export type AppointmentProperties = AppointmentRequired &
  Partial<AppointmentOptional>;

export type AppointmentPropertiesUpdate = Partial<
  Pick<AppointmentRequired, 'schedule' | 'countryISO'> &
    Pick<AppointmentOptional, 'state' | 'updatedAt'>
>;

export class Appointment {
  private appointmentId: string;
  private insuredId: string;
  private schedule: Schedule;
  private countryISO: CountryISO;
  private state: AppointmentState;
  private readonly createdAt: Date;
  private updatedAt: Date | null;
  private deletedAt: Date | null;

  constructor(properties: AppointmentProperties) {
    this.state = 'pending';
    Object.assign(this, properties);
  }

  properties(): AppointmentProperties {
    return {
      appointmentId: this.appointmentId,
      insuredId: this.insuredId,
      schedule: this.schedule,
      countryISO: this.countryISO,
      state: this.state,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  static create(data: {
    insuredId: string;
    schedule: Schedule;
    countryISO: CountryISO;
  }): Appointment {
    const now = new Date();

    return new Appointment({
      appointmentId: uuidv4(),
      insuredId: data.insuredId,
      schedule: data.schedule,
      countryISO: data.countryISO,
      state: 'pending',
      createdAt: now,
      updatedAt: null,
      deletedAt: null,
    });
  }

  update(properties: AppointmentPropertiesUpdate): Appointment {
    this.updatedAt = new Date();
    return Object.assign(this, properties);
  }

  confirm() {
    this.state = 'confirmed';
    this.updatedAt = new Date();
  }

  fail() {
    this.state = 'failed';
    this.updatedAt = new Date();
  }

  deactivate() {
    this.deletedAt = new Date();
    this.state = 'failed';
  }
}
