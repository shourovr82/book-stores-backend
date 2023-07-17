import { Model, Types } from "mongoose";

export type IUser = {
  fullName: string;
  email: string;
  password: string;
};

export type IUserExist = {
  password: string;
  email: string;
  fullName: string;
  _id: Types.ObjectId | undefined;
};

export type UserModel = {
  isUserExist(
    email: string
  ): Promise<Pick<IUserExist, "_id" | "email" | "fullName" | "password">>;

  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
