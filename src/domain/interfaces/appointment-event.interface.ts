export interface AppointmentSchedule {
  scheduleId: number;
  centerId: number;
  specialtyId: number;
  medicId: number;
  date: string; // ISO string
}

export interface AppointmentPayload {
  insuredId: string;
  countryISO: 'PE' | 'CL';
  schedule: AppointmentSchedule;
}

export interface AppointmentCreatedEvent {
  appointmentId: string;
  insuredId: string;
  scheduleId: number;
  countryISO: 'PE' | 'CL';
  createdAt: string;
}

export interface AppointmentConfirmedEvent {
  insuredId: string;
  scheduleId: number;
  countryISO: 'PE' | 'CL';
  state: 'confirmed';
}
