import mongoose, { Schema, model } from "mongoose";
import { BookModel, IBook } from "./books.interfaces";

const reviewsSchema = new mongoose.Schema(
  {
    review: { type: String, required: true },
    email: { type: String, required: true },
    userId: { type: String, required: true },
    fullName: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const BookSchema = new Schema<IBook, BookModel>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    publicationDate: {
      type: String,
      required: true,
    },
    reviews: {
      type: [reviewsSchema],
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Books = model("books", BookSchema);
