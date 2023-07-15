import mongoose from 'mongoose';
import { IGenericErrorResponse } from '../interfaces/common';
import { IGenericErrorMessage } from '../interfaces/error';

const handleValidationError = (
	error: mongoose.Error.ValidationError
): IGenericErrorResponse => {
	const errors: IGenericErrorMessage[] = Object.values(error.errors).map(
		(el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
			return {
				message: el?.message,
				path: el?.path,
			};
		}
	);
	return {
		statusCode: 400,
		success: false,
		message: 'Validation Error',
		errorMessages: errors,
	};
};

export default handleValidationError;
