import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ReviewService } from "./reviews.service";
import ApiError from "../../../errors/ApiErrors";
import { IReview } from "./reviews.interfaces";

const addNewReviewController = catchAsync(
  async (req: Request, res: Response) => {
    const bookId = req.params?.id;
    const newReview: IReview = req.body;

    const result = await ReviewService.addNewReviewService(bookId, newReview);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "New review added successfully !!",
      data: result,
    });
  }
);
// get all reviews
const getReviewsController = catchAsync(async (req: Request, res: Response) => {
  const bookId = req.params?.bookId;
  const result = await ReviewService.getReviewService(bookId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reviews retrieved successfully !!",
    data: result,
  });
});

export const ReviewsController = {
  addNewReviewController,
  getReviewsController,
};
