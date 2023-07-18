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
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const config_1 = __importDefault(require("../../../config"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const user_model_1 = require("./user.model");
const createUserService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.Users.create(payload);
    return result;
});
const loginService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUserExist = yield user_model_1.Users.isUserExist(email);
    if (!isUserExist) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, "User does not exist");
    }
    if (isUserExist.password &&
        !(yield user_model_1.Users.isPasswordMatched(password, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password))) {
        throw new ApiErrors_1.default(http_status_1.default.UNAUTHORIZED, "Password is incorrect");
    }
    //create access token & refresh token
    const { _id, email: userEmail } = isUserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userEmail, _id }, config_1.default.jwt.jwt_secret, config_1.default.jwt.access_token_expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ userEmail, _id }, config_1.default.jwt.refresh_token_secret, config_1.default.jwt.refresh_token_expires_in);
    const userInfo = {
        _id: isUserExist._id,
        email: isUserExist.email,
        fullName: isUserExist.fullName,
    };
    return {
        accessToken,
        refreshToken,
        user: userInfo,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_token_secret);
    }
    catch (err) {
        throw new ApiErrors_1.default(http_status_1.default.FORBIDDEN, "Invalid Refresh Token");
    }
    const { userEmail } = verifiedToken;
    console.log(verifiedToken);
    const isUserExist = yield user_model_1.Users.isUserExist(userEmail);
    if (!isUserExist) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, "User does not exist");
    }
    //generate new token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({
        email: isUserExist.email,
        name: isUserExist.fullName,
        _id: isUserExist._id,
    }, config_1.default.jwt.jwt_secret, config_1.default.jwt.access_token_expires_in);
    return {
        accessToken: newAccessToken,
    };
});
const myProfileService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.Users.findOne({ _id: userData._id }, {
        fullName: 1,
        email: 1,
    });
    if (!result) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, "User not Found !!");
    }
    return result;
});
exports.UserService = {
    createUserService,
    loginService,
    refreshToken,
    myProfileService,
};
