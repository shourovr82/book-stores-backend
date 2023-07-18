"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const books_model_1 = require("../Books/books.model");
// add new book review
const addNewReviewService = (payload, newReview) => __awaiter(void 0, void 0, void 0, function* () {
    // check book
    const book = yield books_model_1.Books.findOne({ _id: payload });
    if (!book) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, "Book not found");
    }
    // book?.reviews?.push(newReview);
    const review = yield books_model_1.Books.findOneAndUpdate({ _id: payload }, { $push: { reviews: newReview } }, { new: true });
    return review;
});
// get book reviews
const getReviewService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check book
    const book = yield books_model_1.Books.findOne({ _id: payload });
    if (!book) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, "Book not found");
    }
    const review = yield books_model_1.Books.findOne({ _id: payload }, {
        reviews: 1,
    });
    return review === null || review === void 0 ? void 0 : review.reviews;
});
exports.ReviewService = {
    addNewReviewService,
    getReviewService,
};
