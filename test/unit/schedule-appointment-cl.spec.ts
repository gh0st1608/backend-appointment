import { defineFeature, loadFeature } from 'jest-cucumber';
import { ScheduleAppointmentCLUseCase } from '../../src/application/use-cases/schedule-appointment-cl.application';

import {
  IRDSAppointmentRepository,
  RDSAppointmentSymbol,
} from '../../src/domain/repository/appointment.repository';

import {
  IEBAppointmentEventPublisher,
} from '../../src/domain/repository/event.repository';

import { AppointmentPayload } from '../../src/domain/interfaces/appointment-event.interface';

import { AppointmentPayloadInvalidException } from '../../src/application/exceptions/appointment-payload-invalid.exception';
import { AppointmentAlreadyExistsException } from '../../src/application/exceptions/appointment-already-exists.exception';

const feature = loadFeature('../features/schedule-appointment-cl.feature', {
  loadRelativePath: true,
  errors: true,
});

defineFeature(feature, (test) => {
  let useCase: ScheduleAppointmentCLUseCase;
  let mockRdsRepo: jest.Mocked<IRDSAppointmentRepository>;
  let mockEventPublisher: jest.Mocked<IEBAppointmentEventPublisher>;
  let caughtError: any;

  const validPayload: AppointmentPayload = {
    appointmentId: 'app-123',
    insuredId: 'ins-777',
    scheduleId: 50,
    centerId: 3,
    specialtyId: 7,
    medicId: 100,
    date: '2025-12-01T10:00:00Z',
    countryISO: 'PE',
  };

  beforeEach(() => {
    mockRdsRepo = {
      existsByInsured: jest.fn().mockResolvedValue(false),
      save: jest.fn().mockResolvedValue(undefined),
      findOne: jest.fn(),
    } as any;

    mockEventPublisher = {
      publishAppointmentConfirmed: jest.fn().mockResolvedValue(undefined),
    } as any;

    useCase = new ScheduleAppointmentCLUseCase(
      mockRdsRepo,
      mockEventPublisher,
    );
  });

  // ---------------------------------------------------------
  // Escenario 1 - Exitoso
  // ---------------------------------------------------------
  test('Registrar una cita CL exitosamente', ({ given, when, then }) => {
    given('un payload válido para agendar una cita CL', () => {
      // validPayload ya existe
    });

    when('ejecuto el caso de uso ScheduleAppointmentCLUseCase', async () => {
      await useCase.execute(validPayload);
    });

    then(
      'la cita debe guardarse y el evento AppointmentConfirmed debe publicarse',
      () => {
        expect(mockRdsRepo.existsByInsured).toHaveBeenCalledWith(
          validPayload.insuredId,
          validPayload.scheduleId,
          validPayload.countryISO,
        );

        expect(mockRdsRepo.save).toHaveBeenCalledTimes(1);

        expect(mockEventPublisher.publishAppointmentConfirmed).toHaveBeenCalledWith(
          expect.objectContaining({
            appointmentId: validPayload.appointmentId,
            insuredId: validPayload.insuredId,
            scheduleId: validPayload.scheduleId,
            countryISO: validPayload.countryISO,
            state: 'confirmed',
          }),
        );
      },
    );
  });

  // ---------------------------------------------------------
  // Escenario 2 - Payload inválido
  // ---------------------------------------------------------
  test('Error cuando el payload es inválido', ({ given, when, then }) => {
    const invalidPayload = null as any;

    given('un payload inválido para agendar una cita CL', () => {
      // invalidPayload es null
    });

    when(
      'ejecuto el caso de uso ScheduleAppointmentCLUseCase con ese payload',
      async () => {
        try {
          await useCase.execute(invalidPayload);
        } catch (err) {
          caughtError = err;
        }
      },
    );

    then('debe lanzarse la excepción AppointmentPayloadInvalidException', () => {
      expect(caughtError).toBeInstanceOf(AppointmentPayloadInvalidException);
    });
  });

  // ---------------------------------------------------------
  // Escenario 3 - Cita ya existe
  // ---------------------------------------------------------
  test('Error cuando la cita ya existe', ({ given, when, then }) => {
    given('un payload válido pero la cita ya existe en RDS', () => {
      mockRdsRepo.existsByInsured.mockResolvedValue(true);
    });

    when('ejecuto el caso de uso ScheduleAppointmentCLUseCase', async () => {
      try {
        await useCase.execute(validPayload);
      } catch (err) {
        caughtError = err;
      }
    });

    then('debe lanzarse la excepción AppointmentAlreadyExistsException', () => {
      expect(caughtError).toBeInstanceOf(AppointmentAlreadyExistsException);
    });
  });
});
