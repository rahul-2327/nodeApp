const mongoose = require("mongoose");
require("dotenv").config();
const URL = process.env.DB_LOCALURL;

// const URL = process.env.DB_URL;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to Mongo server");
});

db.on("disconnected", () => {
  console.log("disConnected to Mongo server");
});

db.on("error", (err) => {
  console.log("error to Mongo server", err);
});

module.exports = db;
