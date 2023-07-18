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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const books_model_1 = require("./books.model");
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const books_contants_1 = require("./books.contants");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../../config"));
// add new book
const addNewBookService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield books_model_1.Books.create(payload);
    return result;
});
// get all book
const getAllBooksService = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: books_contants_1.BooksSearchAbleFields.map((field) => ({
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
    const whenConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield books_model_1.Books.find(whenConditions).sort({ createdAt: -1 });
    return result;
});
//  get single book
const getSingleBookService = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield books_model_1.Books.findOne({ _id: bookId });
    if (!isExist) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, "Book is Not Found !!");
    }
    const result = yield books_model_1.Books.findOne({ _id: bookId });
    return result;
});
// delete book
const deleteBookService = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield books_model_1.Books.findOne({ _id: bookId });
    if (!isExist) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, "Book is Not Found !!");
    }
    const result = yield books_model_1.Books.findOneAndDelete({ _id: bookId });
    return result;
});
// update book =-=--------------------
const updateBookService = (bookId, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield books_model_1.Books.findOne({ _id: bookId });
    if (!isExist) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, "Book is Not Found !!");
    }
    const result = yield books_model_1.Books.findOneAndUpdate({ _id: bookId }, updatedData, {
        new: true,
    });
    return result;
});
const getMyBookService = (token) => __awaiter(void 0, void 0, void 0, function* () {
    //getting user
    const session = yield mongoose_1.default.startSession();
    let allBooks = null;
    try {
        session.startTransaction();
        // check user exist or not
        const isUserExist = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.jwt_secret);
        if (!isUserExist) {
            throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, "User does not exist !");
        }
        const { email, _id } = isUserExist;
        console.log(isUserExist);
        //  check email
        if (email || _id) {
            allBooks = yield books_model_1.Books.find({ userId: _id });
        }
        if (!(allBooks === null || allBooks === void 0 ? void 0 : allBooks.length)) {
            throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, "No Books Found !!");
        }
        //
        yield session.commitTransaction();
        yield session.endSession();
        return allBooks;
    }
    catch (error) {
        // err
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
});
exports.BookService = {
    addNewBookService,
    getAllBooksService,
    getSingleBookService,
    deleteBookService,
    updateBookService,
    getMyBookService,
};
