"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("./books.controller");
const router = express_1.default.Router();
router.post("/", books_controller_1.BooksController.addNewBookController);
router.get("/", books_controller_1.BooksController.getAllBooksController);
router.get("/my-books", books_controller_1.BooksController.getMyBookController);
router.get("/:bookId", books_controller_1.BooksController.getSingleBookController);
router.delete("/:bookId", books_controller_1.BooksController.deleteBookController);
router.patch("/:bookId", books_controller_1.BooksController.updateBookController);
exports.BooksRoutes = router;
