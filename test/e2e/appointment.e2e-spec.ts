import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppointmentModule } from '../../src/appointment.module';

import { TransformInterceptor } from '../../src/infrastructure/transformInterceptor';
import { HttpErrorFilter } from '../../src/infrastructure/helper-error.filter';

import { GetAppointmentByIdUseCase } from '../../src/application/use-cases/get-appointment.application';
import { ScheduleAppointmentUseCase } from '../../src/application/use-cases/schedule-appointment.application';

const baseUrl = '/appointments';

describe(`AppointmentController ${baseUrl} (e2e)`, () => {
  let app: INestApplication;
  let server: any;

  const mockAppointment = {
    appointmentId: 'test-id',
    insuredId: '10013',
    scheduleId: 10,
    centerId: 5,
    specialtyId: 2,
    medicId: 7,
    date: '2025-12-04T14:30:00Z',
    countryISO: 'PE',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppointmentModule],
    })
      .overrideProvider(ScheduleAppointmentUseCase)
      .useValue({
        execute: jest.fn().mockResolvedValue({
          appointment: {
            appointmentId: 'test-id',
          },
          statusCode: 200,
          message: 'Agendamiento en proceso con éxito',
        }),
      })
      .overrideProvider(GetAppointmentByIdUseCase)
      .useValue({
        execute: jest.fn().mockResolvedValue({
          appointment: mockAppointment,
          statusCode: 200,
          message: 'Cita obtenido con éxito',
        }),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new HttpErrorFilter());
    app.useGlobalInterceptors(new TransformInterceptor());
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: false,
        forbidNonWhitelisted: false,
        skipMissingProperties: false,
      }),
    );
    await app.init();
    server = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  // ---------------------------------------------------------------------
  // GET by ID
  // ---------------------------------------------------------------------
  describe('GET /appointments/:id', () => {
    it('Obtiene una cita por ID', async () => {
      const res = await request(server).get(`${baseUrl}/test-id`).expect(200);

      expect(res.body.Data).toEqual({
        appointment: mockAppointment,
        statusCode: 200,
        message: 'Cita obtenido con éxito',
      });
    });
  });

  // ---------------------------------------------------------------------
  // POST create
  // ---------------------------------------------------------------------
  describe('POST /appointments', () => {
    it('Crea una cita correctamente', async () => {
      const res = await request(server)
        .post(`${baseUrl}`)
        .send({ Data: { Appointment: mockAppointment } })
        .expect(201);

      expect(res.body.Data).toEqual({
        appointment: {
          appointmentId: 'test-id',
        },
        statusCode: 200,
        message: 'Agendamiento en proceso con éxito',
      });
    });
  });
});
