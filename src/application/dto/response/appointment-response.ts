export interface AppointmentResponse {
  appointment?: {
    appointmentId: string;
  };
  statusCode: number;
  message: string;
}
