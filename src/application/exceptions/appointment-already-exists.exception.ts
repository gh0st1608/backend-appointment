
import { DomainErrorMessages } from '../../domain/constants/messages';
import { ApplicationException } from './application.exception';

export class AppointmentAlreadyExistsException extends ApplicationException {
    constructor() {
        super(1000, DomainErrorMessages.APPOINTMENT_ALREADY_EXISTS);
      }
}
