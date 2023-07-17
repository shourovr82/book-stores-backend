import httpStatus from "http-status";
import ApiError from "../../../errors/ApiErrors";
import { Books } from "../Books/books.model";
import { IReview } from "./reviews.interfaces";
import { IBook } from "../Books/books.interfaces";

// add new book review
const addNewReviewService = async (
  payload: string,
  newReview: IReview
): Promise<IBook | null> => {
  // check book
  const book = await Books.findOne({ _id: payload });
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found");
  }

  // book?.reviews?.push(newReview);

  const review = await Books.findOneAndUpdate(
    { _id: payload },
    { $push: { reviews: newReview } },
    { new: true }
  );

  return review;
};
// get book reviews
const getReviewService = async (payload: string) => {
  // check book
  const book = await Books.findOne({ _id: payload });
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found");
  }

  const review = await Books.findOne(
    { _id: payload },
    {
      reviews: 1,
    }
  );

  return review?.reviews;
};

export const ReviewService = {
  addNewReviewService,
  getReviewService,
};
