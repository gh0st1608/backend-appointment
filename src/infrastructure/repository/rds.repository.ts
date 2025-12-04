import AppDataSource from '../config/ormconfig-pe';
import { AppointmentEntity } from '../../infrastructure/entities/appointment.entity';
import { IRDSAppointmentRepository } from '../../domain/repository/appointment.repository';
import { Appointment } from '../../domain/entities/appointment.entity';

export class RdsRepository implements IRDSAppointmentRepository {
  async save(appointment: Appointment): Promise<void> {
    const propsAppointment = appointment.properties();
    const propsSchedule = propsAppointment.schedule.properties();
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const repo = AppDataSource.getRepository(AppointmentEntity);
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
}
