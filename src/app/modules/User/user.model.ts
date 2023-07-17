import { Schema, model } from "mongoose";
import { IUser, IUserExist, UserModel } from "./user.interfaces";
import bcrypt from "bcrypt";
import config from "../../../config";

export const UserSchema = new Schema<IUser, UserModel>({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: 0,
  },
});

UserSchema.statics.isUserExist = async function (
  email: string
): Promise<Partial<Pick<IUserExist, "_id" | "fullName" | "email"> | null>> {
  const user = await Users.findOne(
    { email },
    { _id: 1, email: 1, fullName: 1, password: 1 }
  );
  return user;
};

UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  console.log(givenPassword, savedPassword, "from model");
  const isMatched = await bcrypt.compare(givenPassword, savedPassword);
  return isMatched;
};

UserSchema.pre("save", async function (next) {
  ///hasing User Password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

// export model

export const Users = model<IUser, UserModel>("Users", UserSchema);
