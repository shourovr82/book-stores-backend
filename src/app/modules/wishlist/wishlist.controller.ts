import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { WishListService } from "./wishlist.service";

const addToMyWishListsController = catchAsync(
  async (req: Request, res: Response) => {
    const details = req.body;

    const result = await WishListService.addToMyWishListsService(details);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Book added to Wishlist successfully !!",
      data: result,
    });
  }
);
const getAllMyWishListController = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.params?.id;
    console.log(user);
    const result = await WishListService.getMyAllWishListService(user);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Book added to Wishlist successfully !!",
      data: result,
    });
  }
);

export const WishListsController = {
  addToMyWishListsController,
  getAllMyWishListController,
};
