Feature: Schedule Appointment CL Use Case

  Scenario: Registrar una cita CL exitosamente
    Given un payload válido para agendar una cita CL
    When ejecuto el caso de uso ScheduleAppointmentCLUseCase
    Then la cita debe guardarse y el evento AppointmentConfirmed debe publicarse

  Scenario: Error cuando el payload es inválido
    Given un payload inválido para agendar una cita CL
    When ejecuto el caso de uso ScheduleAppointmentCLUseCase con ese payload
    Then debe lanzarse la excepción AppointmentPayloadInvalidException

  Scenario: Error cuando la cita ya existe
    Given un payload válido pero la cita ya existe en RDS
    When ejecuto el caso de uso ScheduleAppointmentCLUseCase
    Then debe lanzarse la excepción AppointmentAlreadyExistsException
