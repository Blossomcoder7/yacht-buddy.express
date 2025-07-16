const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  boatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Boat', 
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  userName: {
    type: String,
  },
  userEmail: {
    type: String,
  },
   bookedDates: [
    {
      type: Date,
    },
  ],
  // Add more fields as needed
}, {
  timestamps: true,
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
