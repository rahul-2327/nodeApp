const mongoose = require("mongoose");

// creation of schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    requried: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["sender", "reciver", "mutual", "sde"],
  },
  mobile: {
    type: String,
    requried: true,
  },
  email: {
    type: String,
    requried: true,
    unique: true,
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
    requried: true,
  },
});

// creating person model
const Persons = mongoose.model("person", personSchema);
module.exports = Persons;
