import express from "express";
import { WishListsController } from "./wishlist.controller";

const router = express.Router();

router.post("/", WishListsController.addToMyWishListsController);
router.get("/:id", WishListsController.getAllMyWishListController);

export const WishListRoutes = router;
