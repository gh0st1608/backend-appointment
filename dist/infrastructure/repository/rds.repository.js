"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RdsRepository = void 0;
const ormconfig_pe_1 = __importDefault(require("../config/ormconfig-pe"));
const appointment_entity_1 = require("../../infrastructure/entities/appointment.entity");
class RdsRepository {
    async save(appointment) {
        const propsAppointment = appointment.properties();
        const propsSchedule = propsAppointment.schedule.properties();
        if (!ormconfig_pe_1.default.isInitialized) {
            await ormconfig_pe_1.default.initialize();
        }
        const repo = ormconfig_pe_1.default.getRepository(appointment_entity_1.AppointmentEntity);
        const entity = repo.create({
            insuredId: propsAppointment.insuredId,
            scheduleId: propsSchedule.scheduleId,
            centerId: propsSchedule.centerId,
            specialtyId: propsSchedule.specialtyId,
            medicId: propsSchedule.medicId,
            date: propsSchedule.date ? new Date(propsSchedule.date) : undefined,
            countryISO: propsAppointment.countryISO,
            state: propsAppointment.state || 'confirmed',
        });
        await repo.save(entity);
    }
}
exports.RdsRepository = RdsRepository;
