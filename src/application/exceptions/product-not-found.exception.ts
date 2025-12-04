import { DomainErrorMessages } from '../../domain/constants/messages';
import { ApplicationException } from './application.exception';

export class AppointmentNotFoundException extends ApplicationException {
  constructor() {
    super(1000, DomainErrorMessages.APPOINTMENT_NOT_FOUND);
  }
}
