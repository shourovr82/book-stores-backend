import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.post("/registration", UserController.createUserController);

router.post("/login", UserController.loginController);

router.post("/refresh-token", UserController.refreshToken);

router.get("/my-profile", UserController.myProfileController);

export const UserRoutes = router;
