"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentNotFoundException = void 0;
const messages_1 = require("../../domain/constants/messages");
const application_exception_1 = require("./application.exception");
class AppointmentNotFoundException extends application_exception_1.ApplicationException {
    constructor() {
        super(1000, messages_1.DomainErrorMessages.APPOINTMENT_NOT_FOUND);
    }
}
exports.AppointmentNotFoundException = AppointmentNotFoundException;
