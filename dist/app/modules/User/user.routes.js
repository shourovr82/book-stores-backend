"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.post("/registration", user_controller_1.UserController.createUserController);
router.post("/login", user_controller_1.UserController.loginController);
router.post("/refresh-token", user_controller_1.UserController.refreshToken);
router.get("/my-profile", user_controller_1.UserController.myProfileController);
exports.UserRoutes = router;
