import { defineFeature, loadFeature } from 'jest-cucumber';
import { ScheduleAppointmentUseCase } from '../../src/application/use-cases/schedule-appointment.application';
import {
  IDynamoAppointmentRepository,
} from '../../src/domain/repository/appointment.repository';
import {
  ISNSAppointmentEventPublisher,
} from '../../src/domain/repository/event.repository';

import { DomainSuccessMessages } from '../../src/domain/constants/messages';
import { HttpStatusResponse } from '../../src/domain/constants/http-code';
import { CountryISO } from '../../src/application/dto/request/create-appointment.dto';

const feature = loadFeature('../features/schedule-appointment.feature', {
  loadRelativePath: true,
  errors: true,
});

defineFeature(feature, (test) => {
  let useCase: ScheduleAppointmentUseCase;
  let mockDynamoRepo: jest.Mocked<IDynamoAppointmentRepository>;
  let mockEventPublisher: jest.Mocked<ISNSAppointmentEventPublisher>;
  let response: any;
  let caughtError: any;

  const mockPayload = {
    Appointment: {
      insuredId: '10013',
      scheduleId: 10,
      centerId: 5,
      specialtyId: 2,
      medicId: 7,
      date: '2025-12-04T14:30:00Z',
      countryISO: CountryISO.PE
    },
  };

  beforeEach(() => {
    mockDynamoRepo = {
      save: jest.fn().mockResolvedValue('appointment-123'),
      findOne: jest.fn(),
      existsByInsured: jest.fn(),
    } as any;

    mockEventPublisher = {
      publishAppointmentCreated: jest
        .fn()
        .mockResolvedValue(undefined),
    } as any;

    useCase = new ScheduleAppointmentUseCase(
      mockDynamoRepo,
      mockEventPublisher,
    );
  });

  // -----------------------------------------------
  // Scenario: Crear cita exitosamente
  // -----------------------------------------------
  test('Crear una cita exitosamente', ({ given, when, then }) => {
    given('un payload válido para crear una cita', () => {
      // mockPayload ya está definido
    });

    when(
      'ejecuto el caso de uso ScheduleAppointmentUseCase',
      async () => {
        response = await useCase.execute(mockPayload);
      },
    );

    then(
      'debo recibir una respuesta exitosa con el appointmentId',
      () => {
        expect(response).toEqual({
          message: DomainSuccessMessages.PENDING_APPOINTMENT_SUCCESS,
          statusCode: HttpStatusResponse.OK,
          appointment: { appointmentId: 'appointment-123' },
        });

        expect(mockDynamoRepo.save).toHaveBeenCalledTimes(1);
        expect(
          mockEventPublisher.publishAppointmentCreated,
        ).toHaveBeenCalledTimes(1);
      },
    );
  });

  // ------------------------------------------------
  // Scenario: Error en infraestructura
  // ------------------------------------------------
  test('Error en infraestructura al guardar la cita', ({
    given,
    and,
    when,
    then,
  }) => {
    given('un payload válido para crear una cita', () => {
      // mockPayload ya definido
    });

    and('el repositorio lanza un error al guardar', () => {
      mockDynamoRepo.save = jest
        .fn()
        .mockRejectedValue(new Error('Infra error'));
    });

    when(
      'ejecuto el caso de uso ScheduleAppointmentUseCase',
      async () => {
        try {
          await useCase.execute(mockPayload);
        } catch (error) {
          caughtError = error;
        }
      },
    );

    then('debo recibir una excepción', () => {
      expect(caughtError).toBeInstanceOf(Error);
      expect(caughtError.message).toBe('Infra error');
    });
  });
});
