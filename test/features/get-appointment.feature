Feature: Obtener una cita
  Scenario: Obtener cita existente
    Given que existe una cita con id "123"
    When solicito la cita por id
    Then debería recibir el objeto de la cita

  Scenario: Intentar obtener una cita inexistente
    Given que la cita no existe
    When solicito una cita por id
    Then debería lanzarse AppointmentNotFoundException
