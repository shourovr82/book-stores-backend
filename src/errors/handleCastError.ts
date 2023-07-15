import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interfaces/error';
const handleCastError = (error: mongoose.Error.CastError) => {
	const errors: IGenericErrorMessage[] = [
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

export default handleCastError;
