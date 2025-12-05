import { Controller, Post, Body } from '@nestjs/common';
import { ScheduleAppointmentUseCase } from '../../application/use-cases/schedule-appointment.application';
import { CreateAppointmentDataDto } from '../../application/dto/request/create-appointment.dto';

@Controller('appointments')
export class AppointmentController {
  constructor(
    private readonly scheduleAppointmentService: ScheduleAppointmentUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateAppointmentDataDto) {
    return await this.scheduleAppointmentService.execute(dto);
  }
}
