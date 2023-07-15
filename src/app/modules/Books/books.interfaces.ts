import { Model } from "mongoose";

export type IBook = {
  title: string;
  author: string;
  genre: string;
  price?: number;
  image?: string;
  description?: string;
};

export type BookModel = Model<IBook, Record<string, unknown>>;
