"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSourcePe = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const appointment_entity_1 = require("../entities/appointment.entity");
exports.AppDataSourcePe = new typeorm_1.DataSource({
    type: 'mysql',
    host: process.env.RDS_HOST_PE || 'localhost',
    port: Number(process.env.RDS_PORT_PE || 3306),
    username: process.env.RDS_USER_PE || 'root',
    password: process.env.RDS_PASSWORD_PE || '',
    database: process.env.RDS_DATABASE_PE || 'appointmentsdb',
    entities: [appointment_entity_1.AppointmentEntity],
    migrations: ['migration/*.ts'],
    synchronize: false,
    logging: false
});
exports.default = exports.AppDataSourcePe;
