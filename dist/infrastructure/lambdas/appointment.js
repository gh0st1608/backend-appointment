"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const core_1 = require("@nestjs/core");
const serverless_http_1 = __importDefault(require("serverless-http"));
const setup_1 = require("../../setup");
const appointment_module_1 = require("../../appointment.module");
let server;
async function bootstrap() {
    const app = await core_1.NestFactory.create(appointment_module_1.AppointmentModule, { bufferLogs: true });
    await (0, setup_1.setupApp)(app);
    await app.init();
    return (0, serverless_http_1.default)(app.getHttpAdapter().getInstance());
}
const handler = async (event, context, callback) => {
    if (!server) {
        server = await bootstrap();
    }
    return server(event, context, callback);
};
exports.handler = handler;
