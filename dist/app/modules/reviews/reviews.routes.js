"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const reviews_controller_1 = require("./reviews.controller");
const router = express_1.default.Router();
router.post("/:id", reviews_controller_1.ReviewsController.addNewReviewController);
router.get("/:bookId", reviews_controller_1.ReviewsController.getReviewsController);
exports.ReviewsRoutes = router;
