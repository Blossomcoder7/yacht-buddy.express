const express = require("express");
const { verifyToken } = require("../Utils/jwtVerify");
const UserController = require('../Controllers/User');
const expressAsyncHandler = require("express-async-handler");

const userRouter = express.Router();



userRouter.post("/login",  UserController.login);

userRouter.post("/register", UserController.register );


// Get user profile (User must be authenticated)
userRouter.get('/profile', verifyToken, UserController.getUserProfile);

module.exports = userRouter;
