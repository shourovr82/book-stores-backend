import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { UserService } from "./user.service";
import config from "../../../config";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { Secret } from "jsonwebtoken";
import { IMyProfile } from "./user.constant";

const createUserController = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;

  const result = await UserService.createUserService(userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `User is created successfully`,
    data: result,
  });
});

const loginController = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;

  const result = await UserService.loginService(loginData);

  const { refreshToken, ...others } = result;

  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "user login successfully",
    data: others,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await UserService.refreshToken(refreshToken);

  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };

  //set refresh token into cookies

  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "user login successfully",
    data: result,
  });
});

const myProfileController = catchAsync(async (req: Request, res: Response) => {
  const userData = jwtHelpers.verifyToken(
    req.headers.authorization as string,
    config.jwt.jwt_secret as Secret
  );

  console.log(userData);

  const result = await UserService.myProfileService(userData);

  console.log(result);

  sendResponse<IMyProfile>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users information retrieved successfully",
    data: result,
  });
});

export const UserController = {
  createUserController,
  loginController,
  refreshToken,
  myProfileController,
};
