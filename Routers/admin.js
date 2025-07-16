const express = require("express");
const { verifyToken } = require("../Utils/jwtVerify");
const admin = require('../Controllers/Admin');
const expressAsyncHandler = require("express-async-handler");

const adminRouter = express.Router();

adminRouter.use(verifyToken);




adminRouter.get("/listedBoats",  admin.ListedBoat);

adminRouter.get("/guestProfile",  admin.GuestProfile);

adminRouter.put('/updateGuest/:id',  admin.UpdateGuest);

adminRouter.post("/acceptBoat/:id",  admin.AcceptBoat);

adminRouter.delete("/deleteBoat/:id",  admin.DeleteBoat);



module.exports = adminRouter;
