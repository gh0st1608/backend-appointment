"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = void 0;
const uuid_1 = require("uuid");
class Appointment {
    constructor(properties) {
        this.state = 'pending';
        Object.assign(this, properties);
    }
    properties() {
        return {
            appointmentId: this.appointmentId,
            insuredId: this.insuredId,
            schedule: this.schedule,
            countryISO: this.countryISO,
            state: this.state,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            deletedAt: this.deletedAt,
        };
    }
    static create(data) {
        const now = new Date();
        return new Appointment({
            appointmentId: (0, uuid_1.v4)(),
            insuredId: data.insuredId,
            schedule: data.schedule,
            countryISO: data.countryISO,
            state: 'pending',
            createdAt: now,
            updatedAt: null,
            deletedAt: null,
        });
    }
    update(properties) {
        this.updatedAt = new Date();
        return Object.assign(this, properties);
    }
    confirm() {
        this.state = 'confirmed';
        this.updatedAt = new Date();
    }
    fail() {
        this.state = 'failed';
        this.updatedAt = new Date();
    }
    deactivate() {
        this.deletedAt = new Date();
        this.state = 'failed';
    }
}
exports.Appointment = Appointment;
