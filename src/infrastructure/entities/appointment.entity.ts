import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Unique } from 'typeorm';

@Entity({ name: 'appointments' })
@Unique(['insuredId', 'scheduleId'])
export class AppointmentEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @Column({ name: 'insured_id', type: 'varchar', length: 5 })
  insuredId!: string;

  @Column({ name: 'schedule_id', type: 'int' })
  scheduleId!: number;

  @Column({ name: 'center_id', type: 'int', nullable: true })
  centerId?: number;

  @Column({ name: 'specialty_id', type: 'int', nullable: true })
  specialtyId?: number;

  @Column({ name: 'medic_id', type: 'int', nullable: true })
  medicId?: number;

  @Column({ name: 'date', type: 'datetime', nullable: true })
  date?: Date;

  @Column({ name: 'country_iso', type: 'varchar', length: 2 })
  countryISO!: string;

  @Column({ name: 'state', type: 'varchar', length: 20 })
  state!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
