import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { AppointmentEntity } from '../entities/appointment.entity';


export const AppDataSourcePe = new DataSource({
    type: 'mysql',
    host: process.env.RDS_HOST_PE || 'localhost',
    port: Number(process.env.RDS_PORT_PE || 3306),
    username: process.env.RDS_USER_PE || 'root',
    password: process.env.RDS_PASSWORD_PE || '',
    database: process.env.RDS_DATABASE_PE || 'appointmentsdb',
    entities: [AppointmentEntity],
    migrations: ['migration/*.ts'],
    synchronize: false,
    logging: false
});

export default AppDataSourcePe