const express = require("express");
const { verifyToken } = require("../Utils/jwtVerify");
const owner = require('../Controllers/Image');

const imageRouter = express.Router();
// imageRouter.use(verifyToken);




imageRouter.get("/boatImage",  owner.boatImage);





module.exports = imageRouter;

