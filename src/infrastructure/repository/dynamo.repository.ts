import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { IDynamoAppointmentRepository } from '../../domain/repository/appointment.repository';
import { Appointment } from '../../domain/entities/appointment.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DynamoRepository implements IDynamoAppointmentRepository {
  private readonly docClient: DynamoDBDocumentClient;
  private readonly tableName = process.env.APPOINTMENT ?? 'Appointment';

  constructor() {
    const client = new DynamoDBClient({
      region: process.env.REGION,
      credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID!,
        secretAccessKey: process.env.SECRET_ACCESS_KEY!,
      },
    });

    this.docClient = DynamoDBDocumentClient.from(client);
  }

  async save(appointment: Appointment): Promise<string> {
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

    await this.docClient.send(
      new PutCommand({ TableName: this.tableName, Item: item }),
    );

    return propsAppointment.appointmentId;
  }
}
