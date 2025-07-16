const nodemailer = require('nodemailer');

// Function to send a quote via email
exports.sendQuoteEmail = async (req, res) => {
  const { adminEmail, Message } = req.body;
  // Create a transporter for sending the email
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'bloossomdev@gmail.com',
    pass: 'wwdwpjqkefptqohq'
  }
  });

  try {
    const mailOptions = {
      from: 'yachtbuddyhosting@gmail.com',
      to: adminEmail,
      subject: "A New Enquiry Recieved",
      text: Message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send('Failed to send the quote via email');
      } else {
        res.status(200).send('Quote sent successfully');
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to send the quote via email');
  }
};
