import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./user.interfaces";

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

// export model
export const Users = model("Users", UserSchema);
