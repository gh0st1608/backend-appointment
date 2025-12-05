
export interface AppointmentPayload {
  insuredId: string;
  countryISO: 'PE' | 'CL';
  scheduleId: number;
  centerId: number;
  specialtyId: number;
  medicId: number;
  date: string;
}

export interface AppointmentCreatedEvent {
  appointmentId: string;
  insuredId: string;
  scheduleId: number;
  countryISO: 'PE' | 'CL';
  createdAt: string;
}

export interface AppointmentConfirmedEvent {
  appointmentId: string;
  insuredId: string;
  scheduleId: number;
  countryISO: 'PE' | 'CL';
  state: 'confirmed';
}
