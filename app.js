require("dotenv").config();
// Mongoose
const mongoose = require("mongoose");
// Express
const express = require("express");
const app = express();
// Middleware packages
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// Port
const port = process.env.PORT || 8000;

// Routes Import
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");

// Mongo DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => console.log(err));

// MiddleWare
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);

// Listen a request
app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});
