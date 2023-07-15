import { IGenericErrorMessage } from './error';

export interface IGenericErrorResponse {
	statusCode: number;
	success: boolean;
	message: string;
	errorMessages: IGenericErrorMessage[];
}

// Pagination Response
export interface IGenericResponse<T> {
	meta: {
		page: number;
		limit: number;
		total: number;
	};
	data: T;
}
