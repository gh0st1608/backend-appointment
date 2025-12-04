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
exports.CreateAppointmentDataDto = exports.CreateAppointmentPayloadDto = exports.CountryISO = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var CountryISO;
(function (CountryISO) {
    CountryISO["PE"] = "PE";
    CountryISO["CL"] = "CL";
})(CountryISO || (exports.CountryISO = CountryISO = {}));
class CreateAppointmentPayloadDto {
}
exports.CreateAppointmentPayloadDto = CreateAppointmentPayloadDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[0-9]{5}$/, {
        message: 'insuredId invalid: must be 5 digits',
    }),
    __metadata("design:type", String)
], CreateAppointmentPayloadDto.prototype, "insuredId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateAppointmentPayloadDto.prototype, "scheduleId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateAppointmentPayloadDto.prototype, "centerId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateAppointmentPayloadDto.prototype, "specialtyId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateAppointmentPayloadDto.prototype, "medicId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAppointmentPayloadDto.prototype, "date", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(CountryISO, {
        message: 'countryISO invalid: must be PE or CL',
    }),
    __metadata("design:type", String)
], CreateAppointmentPayloadDto.prototype, "countryISO", void 0);
class CreateAppointmentDataDto {
}
exports.CreateAppointmentDataDto = CreateAppointmentDataDto;
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateAppointmentPayloadDto),
    __metadata("design:type", CreateAppointmentPayloadDto)
], CreateAppointmentDataDto.prototype, "Appointment", void 0);
