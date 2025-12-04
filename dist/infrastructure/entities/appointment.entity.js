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
exports.AppointmentEntity = void 0;
const typeorm_1 = require("typeorm");
let AppointmentEntity = class AppointmentEntity {
};
exports.AppointmentEntity = AppointmentEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], AppointmentEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'insured_id', type: 'varchar', length: 5 }),
    __metadata("design:type", String)
], AppointmentEntity.prototype, "insuredId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'schedule_id', type: 'int' }),
    __metadata("design:type", Number)
], AppointmentEntity.prototype, "scheduleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'center_id', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], AppointmentEntity.prototype, "centerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'specialty_id', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], AppointmentEntity.prototype, "specialtyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'medic_id', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], AppointmentEntity.prototype, "medicId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'date', type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], AppointmentEntity.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'country_iso', type: 'varchar', length: 2 }),
    __metadata("design:type", String)
], AppointmentEntity.prototype, "countryISO", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'state', type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], AppointmentEntity.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], AppointmentEntity.prototype, "createdAt", void 0);
exports.AppointmentEntity = AppointmentEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'appointments' }),
    (0, typeorm_1.Unique)(['insuredId', 'scheduleId'])
], AppointmentEntity);
