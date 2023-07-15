import express from "express";
import { BooksRoutes } from "../modules/Books/books.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/registration",
  },
  {
    path: "/books",
    route: BooksRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
