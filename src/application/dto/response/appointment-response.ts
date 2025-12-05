import { Appointment } from "../../../domain/entities/appointment.entity";

export interface AppointmentResponse {
  appointment?: {
    appointmentId: string;
  };
  statusCode: number;
  message: string;
}

export interface AppointmentGetResponse {
  appointment: Appointment
  statusCode: number;
  message: string;
}
