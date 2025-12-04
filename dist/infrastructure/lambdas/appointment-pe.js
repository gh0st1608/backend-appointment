"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const core_1 = require("@nestjs/core");
const appointment_module_1 = require("../../appointment.module");
const appointment_consumer_1 = require("../consumers/appointment.consumer");
let app = null;
const handler = async (event, _context, _callback) => {
    if (!app) {
        app = await core_1.NestFactory.createApplicationContext(appointment_module_1.AppointmentModule);
    }
    const consumer = app.get(appointment_consumer_1.AppointmentControllerConsumer);
    await consumer.handle(event, 'PE');
};
exports.handler = handler;
