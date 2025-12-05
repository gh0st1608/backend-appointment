import { DomainErrorMessages } from '../../domain/constants/messages';
import { ApplicationException } from './application.exception';

export class AppointmentPayloadInvalidException extends ApplicationException {
  constructor() {
    super(1001, DomainErrorMessages.APPOINTMENT_PAYLOAD_INVALID);
  }
}
