import express from "express";
import { BooksController } from "./books.controller";

const router = express.Router();

router.post("/", BooksController.addNewBookController);
router.get("/", BooksController.getAllBooksController);
router.get("/:bookId", BooksController.getSingleBookController);
router.delete("/:bookId", BooksController.deleteBookController);
router.patch("/:bookId", BooksController.updateBookController);

export const BooksRoutes = router;
