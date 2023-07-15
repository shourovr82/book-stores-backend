import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
	env: process.env.NODE_ENV,
	port: process.env.PORT,
	database_url: process.env.DATABASE_URL,
	bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
	jwt: {
		jwt_secret: process.env.JWT_SECRET,
		access_token_expires_in: process.env.JWT_EXPIRES_IN,
		refresh_token_secret: process.env.JWT_REFRESH_SECRET,
		refresh_token_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
	},
};
