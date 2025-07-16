const mongoose = require("mongoose");

const boatSchema = new mongoose.Schema({
 
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  images: [{
    originalName: String,
  filename: String,
  path: String,
  }],
  username: {
    type: String,
    // required: true,
  },
  status: {
    type: String,
    required: false,
    default:"reject"
  },
  advanceNotice: {
    type: String,
    // required: true,
  },
  allowedOnBoat: {
    type:  [String],
    // required: true,
  },
  availability: {
    type: String,
    // required: true,
  },
  features: {
    type:  [String],
    // required: true,
  },
  extras: {
    type:  [String],
    // required: true,
  },
  navigation: {
    type:  [String],
    // required: true,
  },
  boatAddress: {
    type: String,
    // required: true,
  },
  year: {
    type: Number,
    // required: true,
  },
  
  make: {
    type: String,
    // required: true,
  },
  passangerCapacity: {
    type: String,
    // required: true,
  },
  model: {
    type: String, 
    // required: true,
  },
  locationType: {
    type: String,
    // required: true,
  },
  zipCode: {
    type: Number,
    // required: true,
  },
  
  country: {
    type: String,
    // required: true,
  },
  address1: {
    type: String, 
    // required: true,
  },
  address2: {
    type: String, 
    // required: true,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
    // required: true,
  },
   power: {
    type: String,
    default: Date.now,
  },
  cateogiry: {
    type: String,
    default: Date.now,
  },
  length: {
    type: Number,
    default: Date.now,
  },
  title: {
    type: String,
    // required: true,
  },
  bookingType:{
    type:String,
    required:false
  },
  description: {
    type: String,
    // required: true,
  },
  policy: {
    type: String,
    // required: true,
  },
  multiBooking: {
    type: String,
    // required: true,
  },
  time: {
    type: String,
    required: false,
  },
  renter: {
    type: String,
    required: false,
  },
  uscg: {
    type: String,
    required: false,
  },
  pay: {
    type: String,
    required: false,
  },
  customStartDate: {
    type: Map,
    of: [String] ,
    required:false
  },
  duration: {
    type: [String],
    // required: true,
  },
  durationPrices: {
    type: mongoose.Schema.Types.Mixed, 
    required: false,
  },
  durationPrices: {
    type: mongoose.Schema.Types.Mixed, 
    required: false,
  },
 
  timePeriod: {
    type: mongoose.Schema.Types.Mixed, 
    required: false,
  },
});

const Boat = mongoose.model("Boat", boatSchema);

module.exports = Boat;
