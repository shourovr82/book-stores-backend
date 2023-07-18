import httpStatus from "http-status";
import ApiError from "../../../errors/ApiErrors";

import { IWishList } from "./wishlist.interfaces";
import { WishLists } from "./wishlist.model";
import { Books } from "../Books/books.model";

interface IDetails {
  user: string;
  book: string;
}

const addToMyWishListsService = async (
  payload: IDetails
): Promise<IWishList | null> => {
  const isWishListExist = await WishLists.isWishListExist(payload);
  console.log(isWishListExist);
  if (isWishListExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "You have already added this book on your wishlist !!"
    );
  }

  const isBookExist = await Books.findOne({ _id: payload.book }).populate(
    "userId"
  );

  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book is not found!!");
  }

  const result = (
    await (await WishLists.create(payload)).populate("book")
  ).populate("user");

  return result;
};
const getMyAllWishListService = async (
  user: string
): Promise<IWishList[] | null> => {
  const result = await WishLists.find({ user }).populate("book");

  return result;
};

export const WishListService = {
  addToMyWishListsService,
  getMyAllWishListService,
};
