const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const BoatList = require("../Models/ListYourBoat");
const User = require("../Models/User");
const Booking = require("../Models/Booking")



exports.allBoat = async (req, res) => {
  try {
    const boat = await BoatList.find();
    if (!boat) {
      return res.status(404).json({ message: 'boats not found' });
    }
    // Return the user's profile
    return res.status(200).json({ boat });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.categriseBoat = async (req, res) => {
  try {
    const category = req.params.category;
    const boat = await BoatList.find({ cateogiry: category, status: "accepted" });
    if (!boat) {
      return res.status(201).json({ message: 'boats not found' });
    }
    return res.status(200).json({ message: "CATEGORY BOAT RESPONSE HERE", boat });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.singleBoat = async (req, res) => {
  try {
    const id = req.params.id;
    const boat = await BoatList.findOne({ _id: id });
    if (!boat) {
      return res.status(201).json({ message: 'boat not found' });
    }
    // Return the user's profile
    return res.status(200).json({ message: "Single Boat Response", boat });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.ownerBoat = async (req, res) => {
  try {
    const userId = req.id;
    const boat = await BoatList.find({ userId: req.id })
      .sort({ createdAt: -1 });
    if (!boat) {
      return res.json({ message: 'boats not found' });
    }
    return res.status(200).json({ boat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.ReviewListBoat = async (req, res) => {
  try {
    const userId = req.id;
    const boatListings = await BoatList.find({ userId: userId })
      .sort({ createdAt: -1 })
      .limit(1);

    // Return the boat listings as a JSON response
    res.status(200).json(boatListings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.getBookedDates = async (req, res) => {
  try {
    const { boatId } = req.params;
    const bookings = await Booking.find({ boatId });
    
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ error: 'Boat not found' });
    }

    // Concatenate booked dates from all bookings
    const bookedDates = bookings.reduce((dates, booking) => {
      return dates.concat(booking.bookedDates);
    }, []);
    res.status(200).json({ bookedDates });
  } catch (error) {
    console.error('Error getting booked dates:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

