import { Model, Types } from "mongoose";
import { IUser } from "../User/user.interfaces";
import { IReview } from "../reviews/reviews.interfaces";

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  price?: number;
  image?: string;
  description?: string;
  reviews?: IReview[];
  userId: Types.ObjectId | IUser;
  email: string;
  name: string;
};
export type BooksFilter = {
  searchTerm?: string;
};

export type BookModel = Model<IBook, Record<string, unknown>>;
