const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const payment = require('../Controllers/payment');
const { verifyToken } = require("../Utils/jwtVerify");


const 


router = express.Router();
// router.use(verifyToken);

router.post("/create_order",  async (req, res) => {
    try {
        const response = await payment.createOrder(req);
        return res.status(200).json(response)
    } catch (error) {
        console.error(req.path, "Error in create order Api", error);
        return res.status(500).json(error);
    }
});

router.post("/aprove_order", async (req, res) => {
    const { orderID } = req.body;
    try {
        const captureData = await paypal.captureOrder(orderID);
        return res.status(200).json(captureData)
    } catch (error) {
        console.error(req.path, "Error in aproveOrder Api", error);
        return res.status(500).json(error);
    }
});

router.post("/stripe", payment.stripePay);


module.exports = router;