"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupApp = setupApp;
// src/bootstrap-app.ts
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const helper_error_filter_1 = require("./infrastructure/helper-error.filter");
const transformInterceptor_1 = require("./infrastructure/transformInterceptor");
async function setupApp(app) {
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        skipMissingProperties: false,
    }));
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector)), new transformInterceptor_1.TransformInterceptor());
    app.useGlobalFilters(new helper_error_filter_1.HttpErrorFilter());
    app.enableCors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
}
