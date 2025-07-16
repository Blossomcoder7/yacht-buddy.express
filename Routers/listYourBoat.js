const express = require('express');
const listBoat = express.Router();
const listYourBoat = require('../Controllers/ListYourBoat');
const upload = require('../Controllers/Image');
const uploadMiddleware = require('../Middlewares/uploadMiddleware');
const { verifyToken } = require("../Utils/jwtVerify");
listBoat.use(verifyToken);


// Create a new boatInfo (Vendor must be authenticated)

listBoat.post('/listYourBoat', uploadMiddleware(), listYourBoat.ListYourBoat);
listBoat.get('/reviewlistBoat', listYourBoat.ReviewListBoat);
// listBoat.post('/uploadPic',uploadMiddleware(), upload.uploadImages);




module.exports = listBoat;
