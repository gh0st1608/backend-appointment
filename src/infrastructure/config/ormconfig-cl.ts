import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { AppointmentEntity } from '../entities/appointment.entity';

export const AppDataSourceCl = new DataSource({
    type: 'mysql',
    host: process.env.RDS_HOST_CL || 'localhost',
    port: Number(process.env.RDS_PORT_CL || 3306),
    username: process.env.RDS_USER_CL || 'root',
    password: process.env.RDS_PASSWORD_CL || '',
    database: process.env.RDS_DATABASE_CL || 'appointmentsdb',
    entities: [AppointmentEntity],
    migrations: ['migration/*.ts'],
    synchronize: false,
    logging: false
});


export default AppDataSourceCl