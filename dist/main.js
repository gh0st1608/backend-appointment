"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/main.ts
const core_1 = require("@nestjs/core");
const appointment_module_1 = require("./appointment.module");
const setup_1 = require("./setup");
async function bootstrap() {
    const app = await core_1.NestFactory.create(appointment_module_1.AppointmentModule);
    await (0, setup_1.setupApp)(app);
    await app.listen(process.env.PORT ?? 3333);
}
bootstrap();
