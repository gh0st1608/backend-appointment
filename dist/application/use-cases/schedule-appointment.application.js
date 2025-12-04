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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleAppointmentUseCase = void 0;
const common_1 = require("@nestjs/common");
const appointment_entity_1 = require("../../domain/entities/appointment.entity");
const appointment_repository_1 = require("../../domain/repository/appointment.repository");
const schedule_entity_1 = require("../../domain/entities/schedule.entity");
const http_code_1 = require("../../domain/constants/http-code");
const event_repository_1 = require("../../domain/repository/event.repository");
const messages_1 = require("../../domain/constants/messages");
let ScheduleAppointmentUseCase = class ScheduleAppointmentUseCase {
    constructor(dynamoRepo, eventPublisher) {
        this.dynamoRepo = dynamoRepo;
        this.eventPublisher = eventPublisher;
    }
    async execute(payload) {
        try {
            const { insuredId, scheduleId, centerId, specialtyId, medicId, date, countryISO, } = payload.Appointment;
            const schedule = new schedule_entity_1.Schedule({
                scheduleId,
                centerId,
                specialtyId,
                medicId,
                date,
            });
            const appointment = appointment_entity_1.Appointment.create({
                insuredId,
                schedule,
                countryISO,
            });
            const appointmentId = await this.dynamoRepo.save(appointment);
            await this.eventPublisher.publishAppointmentCreated({
                appointmentId,
                insuredId,
                scheduleId,
                countryISO,
                createdAt: new Date().toISOString(),
            });
            return {
                message: messages_1.DomainSuccessMessages.PENDING_APPOINTMENT_SUCCESS,
                statusCode: http_code_1.HttpStatusResponse.OK,
                appointment: { appointmentId },
            };
        }
        catch (error) {
            throw error;
        }
    }
};
exports.ScheduleAppointmentUseCase = ScheduleAppointmentUseCase;
exports.ScheduleAppointmentUseCase = ScheduleAppointmentUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(appointment_repository_1.DynamoAppointmentSymbol)),
    __param(1, (0, common_1.Inject)(event_repository_1.SNSAppointmentEventPublisherSymbol)),
    __metadata("design:paramtypes", [Object, Object])
], ScheduleAppointmentUseCase);
