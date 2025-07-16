// const User = require('../Models/User');
const Boat = require("../Models/ListYourBoat");
const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;



exports.ListedBoat = async (req, res) => {
  try {

    const boatListings = await Boat.find()
    .sort({ createdAt: -1 });

    // Return the boat listings as a JSON response
    res.status(200).json(boatListings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.GuestProfile = async (req, res) => {
  try {

    const allUser = await User.find()
    .sort({ createdAt: -1 });

    res.status(200).json(allUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.UpdateGuest = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedGuest = await User.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedGuest) {
      return res.status(404).json({ message: 'Guest not found' });
    }

    res.status(200).json({ message: 'Guest updated successfully', guest: updatedGuest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};                                                                                               

exports.AcceptBoat = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the boat by ID and update its status
    const acceptedBoat = await Boat.findByIdAndUpdate(id, { status: 'accepted' }, { new: true });
console.log(acceptedBoat);
    if (!acceptedBoat) {
      return res.status(404).json({ message: 'Boat not found' });
    }

    res.status(200).json({ message: 'Boat accepted successfully', boat: acceptedBoat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.DeleteBoat = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the boat by ID and remove it
    const deletedBoat = await Boat.findByIdAndRemove(id);
    console.log(deletedBoat);

    if (!deletedBoat) {
      return res.status(404).json({ message: 'Boat not found' });
    }

    res.status(200).json({ message: 'Boat deleted successfully', boat: deletedBoat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};






