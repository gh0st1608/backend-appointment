"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schedule = void 0;
class Schedule {
    constructor(properties) {
        Object.assign(this, properties);
    }
    properties() {
        return {
            scheduleId: this.scheduleId,
            centerId: this.centerId,
            specialtyId: this.specialtyId,
            medicId: this.medicId,
            date: this.date,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            deletedAt: this.deletedAt,
        };
    }
    static create(data) {
        const now = new Date();
        return new Schedule({
            scheduleId: data.scheduleId,
            centerId: data.centerId,
            specialtyId: data.specialtyId,
            medicId: data.medicId,
            date: data.date,
            createdAt: now,
            updatedAt: null,
            deletedAt: null,
        });
    }
    /* update(properties: SchedulePropertiesUpdate): Schedule {
      this.updatedAt = new Date();
      return Object.assign(this, properties);
    } */
    deactivate() {
        this.deletedAt = new Date();
    }
}
exports.Schedule = Schedule;
