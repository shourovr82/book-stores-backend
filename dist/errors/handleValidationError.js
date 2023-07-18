"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError = (error) => {
    const errors = Object.values(error.errors).map((el) => {
        return {
            message: el === null || el === void 0 ? void 0 : el.message,
            path: el === null || el === void 0 ? void 0 : el.path,
        };
    });
    return {
        statusCode: 400,
        success: false,
        message: 'Validation Error',
        errorMessages: errors,
    };
};
exports.default = handleValidationError;
