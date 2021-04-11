require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();

const port = process.env.PORT || 8000;

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});
