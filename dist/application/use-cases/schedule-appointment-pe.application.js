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
var ScheduleAppointmentPEUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleAppointmentPEUseCase = void 0;
const common_1 = require("@nestjs/common");
const appointment_entity_1 = require("../../domain/entities/appointment.entity");
const appointment_repository_1 = require("../../domain/repository/appointment.repository");
const event_repository_1 = require("../../domain/repository/event.repository");
const schedule_entity_1 = require("../../domain/entities/schedule.entity");
let ScheduleAppointmentPEUseCase = ScheduleAppointmentPEUseCase_1 = class ScheduleAppointmentPEUseCase {
    constructor(rdsRepo, eventPublisher) {
        this.rdsRepo = rdsRepo;
        this.eventPublisher = eventPublisher;
        this.logger = new common_1.Logger(ScheduleAppointmentPEUseCase_1.name);
    }
    async execute(payload) {
        if (!payload) {
            throw new Error('Payload inválido');
        }
        const schedule = schedule_entity_1.Schedule.create({
            scheduleId: payload.schedule.scheduleId,
            centerId: payload.schedule.centerId,
            specialtyId: payload.schedule.specialtyId,
            medicId: payload.schedule.medicId,
            date: payload.schedule.date,
        });
        // 1️⃣ Crear la entidad desde el factory method
        const appointment = appointment_entity_1.Appointment.create({
            insuredId: payload.insuredId,
            schedule,
            countryISO: payload.countryISO,
        });
        // 2️⃣ Marcar como confirmado
        appointment.confirm();
        this.logger.log(`Procesando agendamiento PE: appointmentId=${appointment.properties().appointmentId}`);
        // 3️⃣ Guardar en RDS
        await this.rdsRepo.save(appointment);
        // 4️⃣ Enviar evento tipado
        const event = {
            insuredId: appointment.properties().insuredId,
            scheduleId: appointment.properties().schedule.properties().scheduleId,
            countryISO: appointment.properties().countryISO,
            state: 'confirmed',
        };
        await this.eventPublisher.publishAppointmentConfirmed(event);
    }
};
exports.ScheduleAppointmentPEUseCase = ScheduleAppointmentPEUseCase;
exports.ScheduleAppointmentPEUseCase = ScheduleAppointmentPEUseCase = ScheduleAppointmentPEUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(appointment_repository_1.RDSAppointmentSymbol)),
    __param(1, (0, common_1.Inject)(event_repository_1.EBAppointmentEventPublisherSymbol)),
    __metadata("design:paramtypes", [Object, Object])
], ScheduleAppointmentPEUseCase);
