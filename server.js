const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();
const bodyParser = require("body-parser");
const passport = require("./auth");
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
// -->middleware function
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] request made to: ${req.originalUrl}`
  );
  next();
};
app.use(logRequest);

app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate("local", { session: false });

app.get("/", (req, res) => {
  console.log("inside get method '/'");
  res.send("Welcome to chat app");
});
// app.get("/", (req, res) => {
//   res.send("Welcome to chat app");
// });
// --> person routes
const personRoutes = require("./routes/personRoutes");
// --> menu routes
const menuRoutes = require("./routes/menuRoutes");

app.use("/person", localAuthMiddleware, personRoutes);
app.use("/menu", menuRoutes);

app.listen(PORT, () => {
  console.log("listening on port 3000");
});
