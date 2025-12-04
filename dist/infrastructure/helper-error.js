"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelperError = void 0;
const common_1 = require("@nestjs/common");
const application_exception_1 = require("./../application/exceptions/application.exception");
class HelperError {
    static async response(exception) {
        const isHttp = exception instanceof common_1.HttpException;
        const isApp = exception instanceof application_exception_1.ApplicationException;
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Error interno del servidor';
        let title = 'Error inesperado';
        let code = 500;
        let statusText = 'INTERNAL_SERVER_ERROR';
        if (isHttp) {
            status = exception.getStatus();
            code = status;
            statusText = common_1.HttpStatus[status] || 'ERROR';
            const response = exception.getResponse();
            message = response?.message || exception.message;
            title = HelperError.getTitle(status);
        }
        if (isApp) {
            code = exception.statusCode;
            message = exception.message;
            title = exception.title;
            status = 400; // Puedes mapearlo según el `statusCode` si deseas
            statusText = 'BAD_REQUEST';
        }
        return {
            getStatus: () => status,
            getResponse: () => ({
                Error: {
                    code,
                    status: statusText,
                    dateTime: new Date().toISOString(),
                    title,
                    message,
                }
            }),
        };
    }
    static getTitle(status) {
        switch (status) {
            case 400:
                return 'Petición incorrecta';
            case 401:
                return 'No autorizado';
            case 403:
                return 'Acceso prohibido';
            case 404:
                return 'No encontrado';
            case 500:
                return 'Error interno del servidor';
            default:
                return 'Error inesperado';
        }
    }
}
exports.HelperError = HelperError;
