import express from "express";
import { BooksRoutes } from "../modules/Books/books.routes";
import { UserRoutes } from "../modules/User/user.routes";
import { ReviewsRoutes } from "../modules/reviews/reviews.routes";
import { WishListRoutes } from "../modules/wishlist/wishlist.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/books",
    route: BooksRoutes,
  },
  {
    path: "/reviews",
    route: ReviewsRoutes,
  },
  {
    path: "/wishlist",
    route: WishListRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
