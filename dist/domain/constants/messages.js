"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainSuccessMessages = exports.DomainErrorMessages = exports.ServerErrorMessages = void 0;
var ServerErrorMessages;
(function (ServerErrorMessages) {
    ServerErrorMessages["DYNAMO_DB_ERROR"] = "Conexion a dynamoDb fallido.";
})(ServerErrorMessages || (exports.ServerErrorMessages = ServerErrorMessages = {}));
var DomainErrorMessages;
(function (DomainErrorMessages) {
    DomainErrorMessages["APPOINTMENT_NOT_FOUND"] = "Cita no encontrada";
})(DomainErrorMessages || (exports.DomainErrorMessages = DomainErrorMessages = {}));
var DomainSuccessMessages;
(function (DomainSuccessMessages) {
    DomainSuccessMessages["GET_APPOINTMENT_SUCESS"] = "Cita obtenido con \u00E9xito";
    DomainSuccessMessages["CREATE_APPOINTMENT_SUCCESS"] = "Cita creado con \u00E9xito";
    DomainSuccessMessages["PENDING_APPOINTMENT_SUCCESS"] = "Agendamiento en proceso con \u00E9xito";
})(DomainSuccessMessages || (exports.DomainSuccessMessages = DomainSuccessMessages = {}));
