Feature: Confirmar cita

  Scenario: Confirmar una cita existente
    Given que existe una cita con ID "abc-123"
    When ejecuto el use case para confirmar la cita
    Then debe retornar un mensaje de éxito

  Scenario: Error cuando la cita no existe
    Given que no existe una cita con ID "no-existe"
    When ejecuto el use case para confirmar la cita
    Then debe lanzarse una excepción AppointmentNotFoundException
