import express from "express";
import { ReviewsController } from "./reviews.controller";

const router = express.Router();

router.post("/:id", ReviewsController.addNewReviewController);
router.get("/:bookId", ReviewsController.getReviewsController);

export const ReviewsRoutes = router;
