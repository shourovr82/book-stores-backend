"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../config/index"));
const handleValidationError_1 = __importDefault(require("../../errors/handleValidationError"));
const ApiErrors_1 = __importDefault(require("../../errors/ApiErrors"));
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../../errors/handleZodError"));
const handleCastError_1 = __importDefault(require("../../errors/handleCastError"));
const globalErrorHandler = (error, req, res, next) => {
    index_1.default.env === 'development'
        ? console.log('Global Error Handler', error)
        : console.log('Global Error Handler', error);
    let statusCode = 500;
    let message = 'Something went wrong';
    let errorMessages = [];
    if ((error === null || error === void 0 ? void 0 : error.name) === 'ValidationError') {
        const simplifiedErrors = (0, handleValidationError_1.default)(error);
        statusCode = simplifiedErrors.statusCode;
        message = simplifiedErrors.message;
        errorMessages = simplifiedErrors.errorMessages;
    }
    else if (error instanceof zod_1.ZodError) {
        const simplifiedErrors = (0, handleZodError_1.default)(error);
        statusCode = simplifiedErrors.statusCode;
        message = simplifiedErrors.message;
        errorMessages = simplifiedErrors.errorMessages;
    }
    else if ((error === null || error === void 0 ? void 0 : error.name) === 'CastError') {
        const simplifiedErrors = (0, handleCastError_1.default)(error);
        statusCode = simplifiedErrors.statusCode;
        message = simplifiedErrors.message;
        errorMessages = simplifiedErrors.errorMessages;
    }
    else if (error instanceof ApiErrors_1.default) {
        statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: '',
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    else if (error instanceof Error) {
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: '',
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: index_1.default.env !== 'production' ? error.stack : undefined,
    });
};
exports.default = globalErrorHandler;
