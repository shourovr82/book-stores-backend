import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from '../../errors/ApiErrors';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import config from '../../config';
import { Secret } from 'jsonwebtoken';

const auth =
	(...requiredRoles: string[]) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			//get authorization token
			const token = req.headers.authorization;

			if (!token) {
				throw new ApiError(
					httpStatus.UNAUTHORIZED,
					'You are not authorized'
				);
			}
			///verified the token
			let verifiedUser = null;
			verifiedUser = jwtHelpers.verifyToken(
				token,
				config.jwt.jwt_secret as Secret
			);
			req.user = verifiedUser;

			///role dia guard korar jonno
			if (
				requiredRoles.length &&
				!requiredRoles.includes(verifiedUser.role)
			) {
				throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
			}
			next();
		} catch (error) {
			next(error);
		}
	};

export default auth;
