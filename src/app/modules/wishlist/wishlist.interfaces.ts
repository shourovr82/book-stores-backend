import { Model, Types, ObjectId } from "mongoose";
import { IUser } from "../User/user.interfaces";
import { IBook } from "../Books/books.interfaces";

export interface IWishList {
  book: Types.ObjectId | IBook | null;
  user: Types.ObjectId | IUser;
}

export interface IWishListExist {
  book: Types.ObjectId | IBook | null;
  user: Types.ObjectId | IUser | null;
}

interface IDetails {
  user: string;
  book: string;
}
export interface WishListModel extends Model<IWishList> {
  isWishListExist(payload: IDetails): Promise<IWishListExist>;
}
