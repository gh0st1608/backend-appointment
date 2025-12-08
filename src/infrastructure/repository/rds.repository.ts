import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppointmentEntity } from '../../infrastructure/entities/appointment.entity';
import { IRDSAppointmentRepository } from '../../domain/repository/appointment.repository';
import { Appointment } from '../../domain/entities/appointment.entity';
import AppDataSourcePe from '../config/datasource-pe';
import AppDataSourceCl from '../config/datasource-cl';

@Injectable()
export class RdsRepository implements IRDSAppointmentRepository {
  private readonly dataSources: Record<string, DataSource> = {
    PE: AppDataSourcePe,
    CL: AppDataSourceCl,
  };

  private getDataSource(countryISO: string): DataSource {
    const ds = this.dataSources[countryISO];
    if (!ds)
      throw new Error(`No datasource configured for country ${countryISO}`);
    return ds;
  }

  async save(appointment: Appointment): Promise<void> {
    const country = appointment.properties().countryISO;
    const ds = this.getDataSource(country);

    if (!ds.isInitialized) {
      await ds.initialize();
    }

    const repo = ds.getRepository(AppointmentEntity);
    const propsAppointment = appointment.properties();
    const propsSchedule = propsAppointment.schedule.properties();

    const entity = repo.create({
      insuredId: propsAppointment.insuredId,
      scheduleId: propsSchedule.scheduleId,
      centerId: propsSchedule.centerId,
      specialtyId: propsSchedule.specialtyId,
      medicId: propsSchedule.medicId,
      date: propsSchedule.date ? new Date(propsSchedule.date) : undefined,
      countryISO: propsAppointment.countryISO,
      state: propsAppointment.state || 'confirmed',
    });

    await repo.save(entity);
  }

  async existsByInsured(
    insuredId: string,
    scheduleId: number,
    countryISO: string,
  ): Promise<boolean> {
    const ds = this.getDataSource(countryISO);

    if (!ds.isInitialized) {
      await ds.initialize();
    }

    const repo = ds.getRepository(AppointmentEntity);

    const count = await repo.count({
      where: { insuredId, scheduleId },
    });

    return count > 0;
  }
}
