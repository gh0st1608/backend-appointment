import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { IDynamoAppointmentRepository } from '../../domain/repository/appointment.repository';
import { Appointment } from '../../domain/entities/appointment.entity';
import { Injectable } from '@nestjs/common';
import { getAwsCredentials } from '../helpers/aws-helpers';

@Injectable()
export class DynamoRepository implements IDynamoAppointmentRepository {
  private readonly docClient: DynamoDBDocumentClient;
  private readonly tableName = process.env.APPOINTMENT_TABLE ?? 'Appointments';

  constructor() {
    const client = new DynamoDBClient({
      region: process.env.REGION,
      credentials: getAwsCredentials(),
    });

    this.docClient = DynamoDBDocumentClient.from(client);
  }

  async save(appointment: Appointment): Promise<string> {
    try {
      const propsAppointment = appointment.properties();
      const propsSchedule = propsAppointment.schedule.properties();

      const item = {
        appointmentId: propsAppointment.appointmentId,
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
    } catch (error) {
      throw error;
    }
  }
}
