import { JwtPayload, Secret } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
const createToken = (
	payload: Record<string, unknown>,
	secret: Secret,
	expire: string
): string => {
	const token = jwt.sign(payload, secret, {
		expiresIn: expire,
	});
	return token;
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
	return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHelpers = {
	createToken,
	verifyToken,
};
