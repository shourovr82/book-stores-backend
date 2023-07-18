import { Schema, Types, model } from "mongoose";

import {
  IWishList,
  IWishListExist,
  WishListModel,
} from "./wishlist.interfaces";

export const WishListSchema = new Schema<IWishList, WishListModel>(
  {
    book: {
      type: Types.ObjectId,
      required: true,
      ref: "books",
    },
    user: {
      type: Types.ObjectId,
      required: true,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  }
);
interface IDetails {
  user: string;
  book: string;
}
WishListSchema.statics.isWishListExist = async function (
  payload: IDetails
): Promise<IWishListExist | null> {
  const wishlist = await WishLists.findOne({
    book: payload.book,
    user: payload.user,
  });
  return wishlist;
};

// export model

export const WishLists = model<IWishList, WishListModel>(
  "WishLists",
  WishListSchema
);
