import { defineFeature, loadFeature } from 'jest-cucumber';
import { UpdateStatusAppointmentUseCase } from '../../src/application/use-cases/update-appointment.application';
import { AppointmentNotFoundException } from '../../src/application/exceptions/appointment-not-found.exception';
import { HttpStatusResponse } from '../../src/domain/constants/http-code';
import { DomainSuccessMessages } from '../../src/domain/constants/messages';
import { AppointmentConfirmedEvent } from '../../src/domain/interfaces/appointment-event.interface';

const feature = loadFeature('../features/update-status-appointment.feature', {
  loadRelativePath: true,
  errors: true,
});

defineFeature(feature, (test) => {
  let useCase: UpdateStatusAppointmentUseCase;
  let mockRepo: any;
  let response: any;
  let caughtError: any;

  const mockPayload: AppointmentConfirmedEvent = {
    appointmentId: 'test-id',
    insuredId: '10013',
    scheduleId: 10,
    countryISO: 'PE',
    state: 'confirmed',
  };
  beforeEach(() => {
    mockRepo = {
      findOne: jest.fn(),
      save: jest.fn(),
    };

    useCase = new UpdateStatusAppointmentUseCase(mockRepo);
  });

  test('Confirmar una cita existente', ({ given, when, then }) => {
    given(/^que existe una cita con ID "(.*)"$/, (id: string) => {
      mockRepo.findOne.mockResolvedValue({
        id,
        confirm: jest.fn(), // dominio expone método confirm()
      });
    });

    when('ejecuto el use case para confirmar la cita', async () => {
      response = await useCase.execute(mockPayload);
    });

    then('debe retornar un mensaje de éxito', () => {
      expect(response).toEqual({
        message: DomainSuccessMessages.COMPLETED_APPOINTMENT_SUCCESS,
        statusCode: HttpStatusResponse.OK,
      });

      expect(mockRepo.save).toHaveBeenCalled();
    });
  });

  test('Error cuando la cita no existe', ({ given, when, then }) => {
    given(/^que no existe una cita con ID "(.*)"$/, (id: string) => {
      mockRepo.findOne.mockResolvedValue(null);
    });

    when('ejecuto el use case para confirmar la cita', async () => {
      try {
        await useCase.execute(mockPayload);
      } catch (error) {
        caughtError = error;
      }
    });

    then('debe lanzarse una excepción AppointmentNotFoundException', () => {
      expect(caughtError).toBeInstanceOf(AppointmentNotFoundException);
    });
  });
});
