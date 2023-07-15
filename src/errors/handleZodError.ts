import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorMessage } from '../interfaces/error';
import { IGenericErrorResponse } from '../interfaces/common';

const handleZodError = (error: ZodError): IGenericErrorResponse => {
	const errors: IGenericErrorMessage[] = error.issues.map(
		(issue: ZodIssue) => {
			return {
				path: issue?.path[issue?.path.length - 1],
				message: issue?.message,
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

export default handleZodError;
