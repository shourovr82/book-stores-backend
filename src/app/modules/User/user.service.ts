import httpStatus from "http-status";
import ApiError from "../../../errors/ApiErrors";
import {
  ILoginUser,
  ILoginUserResponse,
  IMyProfile,
  IRefreshTokenResponse,
} from "./user.constant";

import config from "../../../config";
import { JwtPayload, Secret } from "jsonwebtoken";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { Users } from "./user.model";
import { IUser } from "./user.interfaces";

const createUserService = async (payload: IUser): Promise<IUser> => {
  const result = await Users.create(payload);
  return result;
};

const loginService = async (
  payload: ILoginUser
): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const isUserExist = await Users.isUserExist(email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  if (
    isUserExist.password &&
    !(await Users.isPasswordMatched(password, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  //create access token & refresh token
  const { _id, email: userEmail } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userEmail, _id },
    config.jwt.jwt_secret as Secret,
    config.jwt.access_token_expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userEmail, _id },
    config.jwt.refresh_token_secret as Secret,
    config.jwt.refresh_token_expires_in as string
  );

  const userInfo = {
    _id: isUserExist._id,
    email: isUserExist.email,
    fullName: isUserExist.fullName,
  };

  return {
    accessToken,
    refreshToken,
    user: userInfo,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_token_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid Refresh Token");
  }

  const { userEmail } = verifiedToken;

  console.log(verifiedToken);

  const isUserExist = await Users.isUserExist(userEmail);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }
  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      email: isUserExist.email,
      name: isUserExist.fullName,
      _id: isUserExist._id,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.access_token_expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

const myProfileService = async (
  userData: JwtPayload
): Promise<IMyProfile | null> => {
  const result = await Users.findOne(
    { _id: userData._id },
    {
      fullName: 1,
      email: 1,
    }
  );

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not Found !!");
  }

  return result;
};

export const UserService = {
  createUserService,
  loginService,
  refreshToken,
  myProfileService,
};
