import { defineFeature, loadFeature } from 'jest-cucumber';
import { GetAppointmentByIdUseCase } from '../../src/application/use-cases/get-appointment.application';
import { AppointmentNotFoundException } from '../../src/application/exceptions/appointment-not-found.exception';
import { DomainSuccessMessages } from '../../src/domain/constants/messages';
import { HttpStatusResponse } from '../../src/domain/constants/http-code';

const feature = loadFeature('../features/get-appointment-by-id.feature', {
  loadRelativePath: true,
  errors: true,
});

defineFeature(feature, (test) => {
  let useCase: GetAppointmentByIdUseCase;
  let mockRepo: any;
  let response: any;
  let caughtError: any;

  beforeEach(() => {
    mockRepo = {
      findOne: jest.fn(),
    };

    useCase = new GetAppointmentByIdUseCase(mockRepo);
  });

  test('Obtener una cita existente', ({ given, when, then }) => {
    given(/^que existe una cita con ID "(.*)"$/, (id: string) => {
      mockRepo.findOne.mockResolvedValue({
        id,
        insuredId: '1001',
        date: '2025-12-01T10:00:00Z',
      });
    });

    when('ejecuto el use case para obtener la cita', async () => {
      response = await useCase.execute('123');
    });

    then('debo recibir la cita encontrada exitosamente', () => {
      expect(response).toEqual({
        appointment: {
          id: '123',
          insuredId: '1001',
          date: '2025-12-01T10:00:00Z',
        },
        message: DomainSuccessMessages.GET_APPOINTMENT_SUCESS,
        statusCode: HttpStatusResponse.OK,
      });
    });
  });

  test('Error cuando la cita no existe', ({ given, when, then }) => {
    given(/^que no existe una cita con ID "(.*)"$/, (id: string) => {
      mockRepo.findOne.mockResolvedValue(null);
    });

    when('ejecuto el use case para obtener la cita', async () => {
      try {
        await useCase.execute('999');
      } catch (error) {
        caughtError = error;
      }
    });

    then('debe lanzarse una excepción AppointmentNotFoundException', () => {
      expect(caughtError).toBeInstanceOf(AppointmentNotFoundException);
    });
  });
});
