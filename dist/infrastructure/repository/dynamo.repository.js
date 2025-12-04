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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamoRepository = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const common_1 = require("@nestjs/common");
let DynamoRepository = class DynamoRepository {
    constructor() {
        this.tableName = process.env.APPOINTMENT ?? 'Appointment';
        const client = new client_dynamodb_1.DynamoDBClient({
            region: process.env.REGION,
            credentials: {
                accessKeyId: process.env.ACCESS_KEY_ID,
                secretAccessKey: process.env.SECRET_ACCESS_KEY,
            },
        });
        this.docClient = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
    }
    async save(appointment) {
        const propsAppointment = appointment.properties();
        const propsSchedule = propsAppointment.schedule.properties();
        const item = {
            insuredId: propsAppointment.insuredId,
            scheduleId: propsSchedule.scheduleId,
            centerId: propsSchedule.centerId,
            specialtyId: propsSchedule.specialtyId,
            medicId: propsSchedule.medicId,
            date: propsSchedule.date,
            countryISO: propsAppointment.countryISO,
            state: 'pending',
            createdAt: new Date().toISOString(),
        };
        await this.docClient.send(new lib_dynamodb_1.PutCommand({ TableName: this.tableName, Item: item }));
        return propsAppointment.appointmentId;
    }
};
exports.DynamoRepository = DynamoRepository;
exports.DynamoRepository = DynamoRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], DynamoRepository);
