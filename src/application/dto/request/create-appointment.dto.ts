import {
  IsString,
  Matches,
  IsNumber,
  IsOptional,
  IsEnum,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum CountryISO {
  PE = 'PE',
  CL = 'CL',
}

export class CreateAppointmentPayloadDto {
  @IsString()
  @Matches(/^[0-9]{5}$/, {
    message: 'insuredId invalid: must be 5 digits',
  })
  insuredId!: string;

  @IsNumber()
  scheduleId!: number;

  @IsOptional()
  @IsNumber()
  centerId?: number;

  @IsOptional()
  @IsNumber()
  specialtyId?: number;

  @IsOptional()
  @IsNumber()
  medicId?: number;

  @IsOptional()
  @IsString()
  date?: string;

  @IsEnum(CountryISO, {
    message: 'countryISO invalid: must be PE or CL',
  })
  countryISO!: CountryISO;
}

export class CreateAppointmentDataDto {
  @ValidateNested({ each: true })
  @Type(() => CreateAppointmentPayloadDto)
  Appointment: CreateAppointmentPayloadDto;
}
