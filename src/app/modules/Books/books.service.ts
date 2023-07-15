import httpStatus from "http-status";
import { IBook } from "./books.interfaces";
import { Books } from "./books.model";
import ApiError from "../../../errors/ApiErrors";

// add new book
const addNewBookService = async (payload: IBook): Promise<IBook> => {
  const result = await Books.create(payload);
  return result;
};

// get all book
const getAllBooksService = async (): Promise<IBook[]> => {
  const result = await Books.find({});
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

export const BookService = {
  addNewBookService,
  getAllBooksService,
  getSingleBookService,
  deleteBookService,
  updateBookService,
};
