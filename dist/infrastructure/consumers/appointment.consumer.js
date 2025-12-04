"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AppointmentControllerConsumer_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentControllerConsumer = void 0;
const common_1 = require("@nestjs/common");
const schedule_appointment_pe_application_1 = require("../../application/use-cases/schedule-appointment-pe.application");
const schedule_appointment_cl_application_1 = require("../../application/use-cases/schedule-appointment-cl.application");
let AppointmentControllerConsumer = AppointmentControllerConsumer_1 = class AppointmentControllerConsumer {
    constructor(scheduleAppointmentPEUseCase, scheduleAppointmentCLUseCase) {
        this.scheduleAppointmentPEUseCase = scheduleAppointmentPEUseCase;
        this.scheduleAppointmentCLUseCase = scheduleAppointmentCLUseCase;
        this.logger = new common_1.Logger(AppointmentControllerConsumer_1.name);
    }
    async handle(event, country) {
        this.logger.log(`📩 Processing queue for country: ${country}`);
        for (const record of event.Records) {
            const body = JSON.parse(record.body);
            switch (country) {
                case 'PE':
                    await this.scheduleAppointmentPEUseCase.execute(body);
                    break;
                case 'CL':
                    await this.scheduleAppointmentCLUseCase.execute(body);
                    break;
                default:
                    this.logger.warn(`No processor for country ${country}`);
            }
        }
    }
};
exports.AppointmentControllerConsumer = AppointmentControllerConsumer;
exports.AppointmentControllerConsumer = AppointmentControllerConsumer = AppointmentControllerConsumer_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [schedule_appointment_pe_application_1.ScheduleAppointmentPEUseCase,
        schedule_appointment_cl_application_1.ScheduleAppointmentCLUseCase])
], AppointmentControllerConsumer);
