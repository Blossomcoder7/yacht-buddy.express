const Booking = require("../Models/Booking");
const Boat = require("../Models/ListYourBoat");

const getDatesBetweenDates = (startDate, endDate) => {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

module.exports.createBooking = async (req, res) => {
  try {
    //   Parse the JSON string into an object
    const bookingDetails = JSON.parse(req.body.bookingDetail);
    // console.log(bookingDetails)

    const { id, date, price } = bookingDetails;

    if (!date || !Array.isArray(date) || date.length === 0) {
      throw new Error("Invalid date array");
    }

    const startDate = date[0].startDate;
    const endDate = date[0].endDate;

    const userId = req.id;

    const newBooking = new Booking({
      userID: userId,
      userName: req.name,
      userEmail: req.email,
      boatId: id,
      startDate: startDate,
      endDate: endDate,
      totalPrice: price,
      // Add more fields as needed
    });
    newBooking.bookedDates.push(...getDatesBetweenDates(startDate, endDate));

    await newBooking.save();

    res
      .status(200)
      .json({ message: "Booking created successfully", booking: newBooking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.allBooking = async (req, res) => {
  try {
    const uniqueBoatIds = await Booking.aggregate([
      {
        $group: {
          _id: "$boatId",
          firstBooking: { $first: "$$ROOT" },
        },
      },
      {
        $replaceRoot: { newRoot: "$firstBooking" },
      },
    ]);

    console.log(
      "Unique Boat IDs:",
      uniqueBoatIds.map((booking) => booking.boatId)
    );

    // find all the boat
    const boatInfo = await Boat.find({
      _id: { $in: uniqueBoatIds.map((booking) => booking.boatId) },
    });
    console.log("Boat Info :", boatInfo);

    return res.status(200).json(boatInfo);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.ownerBooking = async (req, res) => {
  try {
    const uniqueBoatIds = await Booking.aggregate([
      {
        $group: {
          _id: "$boatId",
          firstBooking: { $first: "$$ROOT" },
        },
      },
      {
        $replaceRoot: { newRoot: "$firstBooking" },
      },
    ]);

    console.log(
      "Unique Boat IDs:",
      uniqueBoatIds.map((booking) => booking.boatId)
    );

    // find all the boat
    const boatInfo = await Boat.find({
      _id: { $in: uniqueBoatIds.map((booking) => booking.boatId) },
      userId: req.id,
    });
    console.log("Boat Info :", boatInfo);

    return res.status(200).json(boatInfo);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.bookingDetail = async (req, res) => {
  try {
    const boatId = req.params.id;
    console.log(boatId);

    const bookings = await Booking.find({ boatId: boatId });
    console.log("Booking Info:", bookings);

    if (!bookings) {
      return res.status(201).json({ error: "Booking not found" });
    }

    return res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
