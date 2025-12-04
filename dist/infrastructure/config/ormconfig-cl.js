"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSourceCl = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const appointment_entity_1 = require("../entities/appointment.entity");
exports.AppDataSourceCl = new typeorm_1.DataSource({
    type: 'mysql',
    host: process.env.RDS_HOST_CL || 'localhost',
    port: Number(process.env.RDS_PORT_CL || 3306),
    username: process.env.RDS_USER_CL || 'root',
    password: process.env.RDS_PASSWORD_CL || '',
    database: process.env.RDS_DATABASE_CL || 'appointmentsdb',
    entities: [appointment_entity_1.AppointmentEntity],
    migrations: ['migration/*.ts'],
    synchronize: false,
    logging: false
});
exports.default = exports.AppDataSourceCl;
