import { IUser } from "./user.interfaces";

export type ILoginUser = {
  email: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
  user?: {
    email: string;
    fullName: string;
  };
};

export type IRefreshTokenResponse = {
  accessToken: string;
};

export type IMyProfile = {
  password?: string;
  fullName: string;
  email: string;
};
