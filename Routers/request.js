const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const requestController = require('../Controllers/Request');
const { verifyToken } = require("../Utils/jwtVerify");


const router = express.Router();
// router.use(verifyToken);

router.post("/request", requestController.createRequest);


module.exports = router;