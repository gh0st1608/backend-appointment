Feature: Schedule Appointment
  Como sistema de citas
  Quiero crear una cita programada
  Para registrar al paciente y disparar el evento de creación

  Scenario: Crear una cita exitosamente
    Given un payload válido para crear una cita
    When ejecuto el caso de uso ScheduleAppointmentUseCase
    Then debo recibir una respuesta exitosa con el appointmentId

  Scenario: Error en infraestructura al guardar la cita
    Given un payload válido para crear una cita
    And el repositorio lanza un error al guardar
    When ejecuto el caso de uso ScheduleAppointmentUseCase
    Then debo recibir una excepción
