"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const appointment_controller_1 = require("./infrastructure/controllers/appointment.controller");
const dynamo_repository_1 = require("./infrastructure/repository/dynamo.repository");
const schedule_appointment_application_1 = require("./application/use-cases/schedule-appointment.application");
const appointment_repository_1 = require("./domain/repository/appointment.repository");
const rds_repository_1 = require("./infrastructure/repository/rds.repository");
const event_repository_1 = require("./domain/repository/event.repository");
const sns_repository_1 = require("./infrastructure/repository/sns.repository");
const eventbridge_repository_1 = require("./infrastructure/repository/eventbridge.repository");
const schedule_appointment_pe_application_1 = require("./application/use-cases/schedule-appointment-pe.application");
const schedule_appointment_cl_application_1 = require("./application/use-cases/schedule-appointment-cl.application");
const appointment_consumer_1 = require("./infrastructure/consumers/appointment.consumer");
let AppointmentModule = class AppointmentModule {
};
exports.AppointmentModule = AppointmentModule;
exports.AppointmentModule = AppointmentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: `${process.env.NODE_ENV || ''}.env`,
                isGlobal: true,
            }),
        ],
        controllers: [appointment_controller_1.AppointmentController],
        providers: [
            {
                provide: appointment_repository_1.DynamoAppointmentSymbol,
                useClass: dynamo_repository_1.DynamoRepository,
            },
            {
                provide: appointment_repository_1.RDSAppointmentSymbol,
                useClass: rds_repository_1.RdsRepository,
            },
            {
                provide: event_repository_1.SNSAppointmentEventPublisherSymbol,
                useClass: sns_repository_1.SNSAppointmentPublisher,
            },
            {
                provide: event_repository_1.EBAppointmentEventPublisherSymbol,
                useClass: eventbridge_repository_1.EBAppointmentPublisher,
            },
            schedule_appointment_application_1.ScheduleAppointmentUseCase,
            schedule_appointment_pe_application_1.ScheduleAppointmentPEUseCase,
            schedule_appointment_cl_application_1.ScheduleAppointmentCLUseCase,
            appointment_consumer_1.AppointmentControllerConsumer
        ],
    })
], AppointmentModule);
