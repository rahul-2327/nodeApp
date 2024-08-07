const mongoose = require("mongoose");
const URL = "mongodb://localhost:27017/chatapp";

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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
