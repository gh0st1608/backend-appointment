import { Inject, Injectable } from '@nestjs/common';
import { HttpStatusResponse } from '../../domain/constants/http-code';
import { DomainSuccessMessages } from '../../domain/constants/messages';
import { AppointmentGetResponse } from '../dto/response/appointment-response';
import { AppointmentNotFoundException } from '../exceptions/appointment-not-found.exception';
import { DynamoAppointmentSymbol, IDynamoAppointmentRepository } from '../../domain/repository/appointment.repository';

@Injectable()
export class GetAppointmentByIdUseCase {
  constructor(
    @Inject(DynamoAppointmentSymbol)
    private readonly dynamoRepo: IDynamoAppointmentRepository,
  ) {}

  async execute(id: string): Promise<AppointmentGetResponse> {
    const appointment = await this.dynamoRepo.findOne(id);

    if (!appointment) {
      throw new AppointmentNotFoundException();
    }

    return {
      appointment,
      statusCode: HttpStatusResponse.OK,
      message: DomainSuccessMessages.GET_APPOINTMENT_SUCESS
    };
  }
}
