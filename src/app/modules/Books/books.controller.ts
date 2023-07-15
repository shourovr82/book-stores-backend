import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { BookService } from "./books.service";

const addNewBookController = catchAsync(async (req: Request, res: Response) => {
  const { ...newBookData } = req.body;

  const result = await BookService.addNewBookService(newBookData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cow created successfully !!",
    data: result,
  });
});
const getAllBooksController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await BookService.getAllBooksService();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "All Books retrieved successfully !!",
      data: result,
    });
  }
);
const getSingleBookController = catchAsync(
  async (req: Request, res: Response) => {
    const { bookId } = req.params;
    const result = await BookService.getSingleBookService(bookId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Book  retrieved successfully !!",
      data: result,
    });
  }
);
const deleteBookController = catchAsync(async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const result = await BookService.deleteBookService(bookId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book  Deleted successfully !!",
    data: result,
  });
});

const updateBookController = catchAsync(async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const { ...updatedData } = req.body;

  const result = await BookService.updateBookService(bookId, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book  Updated    successfully !!",
    data: result,
  });
});

export const BooksController = {
  addNewBookController,
  getAllBooksController,
  getSingleBookController,
  deleteBookController,
  updateBookController,
};
