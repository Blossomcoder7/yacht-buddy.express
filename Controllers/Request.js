const Request = require("../Models/Request");
const Boat = require("../Models/ListYourBoat");

exports.createRequest = async (req, res) => {
  try {
    console.log(req.body)
    const { reqstData, date, selectedlocation } = req.body;
    let PersonCount = reqstData.passanger;
    console.log("PersonCount IS ", PersonCount)
    let startDate = date.startDate;
    let endDate = date.endDate;
    console.log({ startDate, endDate });
    console.log(selectedlocation)

    const requested = await Boat.find({
      boatAddress: selectedlocation,
      passangerCapacity: { $gte: PersonCount },
      // availableDates: {
      // $elemMatch: { $gte: new Date(startDate), $lte: new Date(endDate) }
      // }
    });

    console.log(requested);

    if (requested.length === 0) {
      return res.status(201).send({
        message: "No Boat Found",
      });
    } else {
      return res.status(200).json({ boats: requested });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};

