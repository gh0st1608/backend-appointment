import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ScheduleAppointmentUseCase } from '../../application/use-cases/schedule-appointment.application';
import { CreateAppointmentDataDto } from '../../application/dto/request/create-appointment.dto';
import { GetAppointmentByIdUseCase } from '../../application/use-cases/get-appointment.application';

@Controller('appointments')
export class AppointmentController {
  constructor(
    private readonly scheduleAppointmentService: ScheduleAppointmentUseCase,
    private readonly getAppointmentByIdUseCase: GetAppointmentByIdUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateAppointmentDataDto) {
    return await this.scheduleAppointmentService.execute(dto);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.getAppointmentByIdUseCase.execute(id);
  }
}
