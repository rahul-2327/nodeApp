const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");
require("dotenv").config();

app.use(bodyParser.json());

// --> person routes
const personRoutes = require("./routes/personRoutes");
app.use("/person", personRoutes);

// --> menu routes
const menuRoutes = require("./routes/menuRoutes");
app.use("/menu", menuRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("listening on port 3000");
});
