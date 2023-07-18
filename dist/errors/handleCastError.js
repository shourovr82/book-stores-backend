"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (error) => {
    const errors = [
        {
            path: error.path,
            message: `Invalid ${error.path}: ${error.value}`,
        },
    ];
    return {
        statusCode: 400,
        success: false,
        message: 'Validation Error',
        errorMessages: errors,
    };
};
exports.default = handleCastError;
