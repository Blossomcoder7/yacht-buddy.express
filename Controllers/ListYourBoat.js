const Boat = require("../Models/ListYourBoat");
// const Image = require("../Models/Image");
const User = require("../Models/User");
const { uploadImages } = require("./Image");
const fs = require('fs');
const path = require('path');
const verifyToken = require('./../Utils/jwtVerify');
const uuid = require('uuid');


exports.ListYourBoat = async (req, res) => {
  try {
    console.log(req.body);
    const {
      bookingType,
      durationPrices,
      advanceNotice,
      availability,
      multibooking,
      boatAddress,
      year,
      make,
      model,
      locationType,
      country,
      address1,
      address2,
      state,
      city,
      zipCode,
      title,
      description,
      policy,
      allowedOnBoat,
      features,
      extras,
      navigation,
      power,
      customStartDate,
      length,
      passangerCapacity,
      cateogiry,
      duration,
      renter,
      uscg,
      pay,
      checkedItems,
    } = req.body.formData;

    // Upload images
    const base64Images = req.body.images;
    const uploadedFiles = base64Images.map((base64, index) => {
      const buffer = Buffer.from(base64, 'base64');
      const filename = `image_${uuid.v4()}.png`;
      console.log(__dirname);
      const filePath = path.join(__dirname, '../public/uploads', filename);

      fs.writeFileSync(filePath, buffer);
      return {
        originalName: filename,
        filename: filename,
        path: filePath,
      };
    }
    );

    // Create a new boat instance with images and other data
    const newBoat = new Boat({
      userId: req.id,
      images: uploadedFiles,
      username: req.name,
      advanceNotice,
      allowedOnBoat,
      availability,
      features,
      customStartDate,
      bookingType,
      extras,
      navigation,
      boatAddress,
      year,
      make,
      model,
      locationType,
      zipCode,
      country,
      address1,
      address2,
      state,
      city,
      power,
      cateogiry,
      length,
      title,
      description,
      policy,
      multiBooking: multibooking,
      time: duration,
      renter,
      uscg,
      pay,
      passangerCapacity,
      timePeriod: checkedItems,
      durationPrices,
    });

    // Save the boat to the database
    const savedBoatListing = await newBoat.save();
    if (!savedBoatListing) {
      res.status(401).json({ message: 'Boat Location Not Saved' });
    }

    // Send the complete boat object in the response
    res.status(200).json(savedBoatListing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};




exports.ReviewListBoat = async (req, res) => {
  try {
    const userId = req.id;
    console.log(userId);
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
