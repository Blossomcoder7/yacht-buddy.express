const Inquiry = require("../Models/Inquiry");

module.exports.SaveInquiry = async (req, res) => {
  try {
    console.log(req.body)
    const { date, time, startTime, ownerID, id } = req.body;
    const inquiry = new Inquiry({ 
      boatId: id, 
      ownerID,
      date, 
      duration: time,
      startTime, 
      passenger: req.body.passanger.passanger,
      username: req.name,
      email:req.email });

    if (!inquiry) {
      return res.status(201).json("Inquiry Not send");
    }
    await inquiry.save();
    console.log(inquiry);
    return res.status(200).json({ message: "Inquiry Saved", inquiry });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports.AllInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.find();
    if (!inquiry) {
      return res.status(201).json("Inquiry Not send");
    }

    return res.status(200).json({ message: "Inquiry Saved", inquiry });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.updateInquiry = async (req, res) => {
  try {
    const { id } = req.params; 
    const inquiry = await Inquiry.findById({_id:id});

    if (!inquiry) {
      return res.status(201).json({ message: 'Inquiry not found' });
    }

    inquiry.sendTOwner = "yes"; 
    await inquiry.save();

    return res.status(200).json({ message: 'Inquiry status updated' });
  } catch (error) {
    console.error('Error updating inquiry status:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports.ownerInquiry = async (req, res) => {
  try {
    const ownerId = req.id;

    const inquiries = await Inquiry.find({ ownerID: ownerId, sendTOwner: "yes" });
    if (inquiries.length === 0) {
      return res.status(404).json({ message: "No inquiries found" });
    }

    return res.status(200).json({ message: "Inquiries retrieved", inquiries });
  } catch (error) {
    console.error('Error retrieving inquiries:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
