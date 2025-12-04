import { AppointmentConfirmedEvent } from '../interfaces/appointment-event.interface';
import { AppointmentCreatedEvent } from '../interfaces/appointment-event.interface';

export interface ISNSAppointmentEventPublisher {
  publishAppointmentCreated(event: AppointmentCreatedEvent): Promise<void>;
}

export interface IEBAppointmentEventPublisher {
  publishAppointmentConfirmed(event: AppointmentConfirmedEvent): Promise<void>;
}

export const SNSAppointmentEventPublisherSymbol = Symbol('ISNSAppointmentEventPublisher');
export const EBAppointmentEventPublisherSymbol = Symbol('IEBAppointmentEventPublisher');

