"use strict";
// src/application/exceptions/application.exception.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationException = void 0;
class ApplicationException extends Error {
    constructor(statusCode, message, title = 'Error de aplicación') {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.title = title;
    }
}
exports.ApplicationException = ApplicationException;
