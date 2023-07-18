"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_routes_1 = require("../modules/Books/books.routes");
const user_routes_1 = require("../modules/User/user.routes");
const reviews_routes_1 = require("../modules/reviews/reviews.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/users",
        route: user_routes_1.UserRoutes,
    },
    {
        path: "/books",
        route: books_routes_1.BooksRoutes,
    },
    {
        path: "/reviews",
        route: reviews_routes_1.ReviewsRoutes,
    },
];
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
