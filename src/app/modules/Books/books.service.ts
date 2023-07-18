import httpStatus from "http-status";
import { BooksFilter, IBook } from "./books.interfaces";
import { Books } from "./books.model";
import ApiError from "../../../errors/ApiErrors";
import { BooksSearchAbleFields } from "./books.contants";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import mongoose from "mongoose";
import config from "../../../config";
import { Secret } from "jsonwebtoken";

// add new book
const addNewBookService = async (payload: IBook): Promise<IBook> => {
  const result = await Books.create(payload);
  return result;
};

// get all book
const getAllBooksService = async (filters: BooksFilter): Promise<IBook[]> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: BooksSearchAbleFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whenConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Books.find(whenConditions)
    .sort({ createdAt: -1 })
    .populate("userId");
  return result;
};

//  get single book

const getSingleBookService = async (bookId: string): Promise<IBook | null> => {
  const isExist = await Books.findOne({ _id: bookId });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book is Not Found !!");
  }

  const result = await Books.findOne({ _id: bookId });
  return result;
};
// delete book
const deleteBookService = async (bookId: string): Promise<IBook | null> => {
  const isExist = await Books.findOne({ _id: bookId });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book is Not Found !!");
  }

  const result = await Books.findOneAndDelete({ _id: bookId });
  return result;
};

// update book =-=--------------------
const updateBookService = async (
  bookId: string,
  updatedData: Partial<IBook>
): Promise<IBook | null> => {
  const isExist = await Books.findOne({ _id: bookId });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book is Not Found !!");
  }

  const result = await Books.findOneAndUpdate({ _id: bookId }, updatedData, {
    new: true,
  });

  return result;
};
const getMyBookService = async (token: string): Promise<IBook[] | null> => {
  //getting user

  const session = await mongoose.startSession();
  let allBooks = null;
  try {
    session.startTransaction();
    // check user exist or not
    const isUserExist = jwtHelpers.verifyToken(
      token,
      config.jwt.jwt_secret as Secret
    );
    if (!isUserExist) {
      throw new ApiError(httpStatus.NOT_FOUND, "User does not exist !");
    }

    const { email, _id } = isUserExist;

    console.log(isUserExist);
    //  check email
    if (email || _id) {
      allBooks = await Books.find({ userId: _id });
    }

    if (!allBooks?.length) {
      throw new ApiError(httpStatus.NOT_FOUND, "No Books Found !!");
    }
    //
    await session.commitTransaction();
    await session.endSession();
    return allBooks;
  } catch (error) {
    // err
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};
export const BookService = {
  addNewBookService,
  getAllBooksService,
  getSingleBookService,
  deleteBookService,
  updateBookService,
  getMyBookService,
};
