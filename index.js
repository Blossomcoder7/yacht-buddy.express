const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");

const userRouter = require('./Routers/user');
const adminRouter = require('./Routers/admin');
const requestRouter = require('./Routers/request');
const listBoatRouter = require('./Routers/listYourBoat');
const messageRoutes = require('./Routers/Message');
const boatRoutes = require('./Routers/boat');
const paypalRoutes = require('./Routers/payment');
const imgRoutes = require('./Routers/Images');
const inquiryRoutes = require('./Routers/inquiry');
const emailRoutes = require('./Routers/emailRoutes');
const { FRONTEND_URL } = require("./config");
const dotenv = require('dotenv');
const booking = require("./Routers/booking");

dotenv.config();

const app = express();

const corsOptions = {
  origin: FRONTEND_URL,
  credentials: true
};
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '100mb', extended: true }));
app.use(require('./Middlewares/errorMiddleware'));
const PORT = process.env.PORT || 5001;
app.use(express.json());
app.use('/root/yacHt/Backend/public/uploads', express.static(path.join(__dirname, 'public', 'uploads')));


app.get("/", (req, res) => {
  console.log("home")
  res.send("Server is ready");
});

// Routes
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/request", requestRouter);
app.use("/listYourBoat", listBoatRouter);
app.use('/chat', messageRoutes);
app.use('/boat', boatRoutes);
app.use('/checkout', paypalRoutes);
app.use('/img', imgRoutes);
app.use('/inquiry', inquiryRoutes);
app.use('/email', emailRoutes);
app.use('/booking', booking);

app.use((req, res, next) => {
  res.status(404).send("Route not found");
});


mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.on("open", () => {
  console.log("Connected to Database: MongoDB");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
