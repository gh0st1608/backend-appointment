Feature: Obtener cita por ID
  Scenario: Obtener una cita existente
    Given que existe una cita con ID "123"
    When ejecuto el use case para obtener la cita
    Then debo recibir la cita encontrada exitosamente

  Scenario: Error cuando la cita no existe
    Given que no existe una cita con ID "999"
    When ejecuto el use case para obtener la cita
    Then debe lanzarse una excepción AppointmentNotFoundException
