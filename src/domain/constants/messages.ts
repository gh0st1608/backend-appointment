export enum ServerErrorMessages {
  DYNAMO_DB_ERROR = 'Conexion a dynamoDb fallido.',
}

export enum DomainErrorMessages {
  APPOINTMENT_NOT_FOUND = 'Cita no encontrada',
  APPOINTMENT_PAYLOAD_INVALID= 'Payload Invàlido',
  APPOINTMENT_ALREADY_EXISTS = 'Cita ya agendada por el cliente en el mismo espacio'
}

export enum DomainSuccessMessages {
  GET_APPOINTMENT_SUCESS = 'Cita obtenido con éxito',
  CREATE_APPOINTMENT_SUCCESS = 'Cita creado con éxito',
  PENDING_APPOINTMENT_SUCCESS = 'Agendamiento en proceso con éxito',
  COMPLETED_APPOINTMENT_SUCCESS = 'Agendamiento completado con èxito'
}
