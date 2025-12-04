"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SNSAppointmentPublisher = void 0;
const common_1 = require("@nestjs/common");
const client_sns_1 = require("@aws-sdk/client-sns");
let SNSAppointmentPublisher = class SNSAppointmentPublisher {
    constructor() {
        this.client = new client_sns_1.SNSClient({ region: process.env.REGION });
    }
    async publishAppointmentCreated(event) {
        await this.client.send(new client_sns_1.PublishCommand({
            TopicArn: process.env.APPOINTMENT_CREATED_TOPIC_ARN,
            Message: JSON.stringify(event),
            MessageAttributes: {
                countryISO: {
                    DataType: 'String',
                    StringValue: event.countryISO,
                },
            },
        }));
    }
};
exports.SNSAppointmentPublisher = SNSAppointmentPublisher;
exports.SNSAppointmentPublisher = SNSAppointmentPublisher = __decorate([
    (0, common_1.Injectable)()
], SNSAppointmentPublisher);
