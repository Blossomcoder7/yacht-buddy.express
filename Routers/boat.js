const express = require('express');
const boatController = require('../Controllers/Boat');
const { verifyToken } = require("../Utils/jwtVerify");


const Boat = express.Router();

Boat.get('/allBoat', boatController.allBoat);
Boat.get('/ownerBoat',verifyToken, boatController.ownerBoat);
Boat.get('/singleBoat/:id', boatController.singleBoat);
Boat.get('/:category', boatController.categriseBoat);

//Get : Get all dates of Booking
Boat.get('/bookedDates/:boatId', boatController.getBookedDates);

module.exports = Boat;
