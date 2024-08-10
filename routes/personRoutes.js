const express = require("express");
const router = express.Router();
const Person = require("./../models/Person");

//--> post method to save data on db
router.post("/", async (req, res) => {
  console.log("inside the auth middleware");
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log("data saved in database ", response);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//-->now get method to fetch data from the db

router.get("/", async (req, res) => {
  try {
    console.log(req);
    const persons = await Person.find();
    console.log("data fetched from database");
    res.status(200).json(persons);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

// parameterized url
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (
      workType === "sde" ||
      workType === "sender" ||
      workType === "reciver" ||
      workType === "mutual"
    ) {
      const response = await Person.find({ work: workType });
      console.log("Sent all response regarding ", workType);
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: "Invalid worktype" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;
    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!response) {
      console.log("Bad request: person not found");
      return res.status(404).json({ message: "Person not found" });
    }
    console.log("entry updated ", response);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server erro" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const delId = req.params.id;
    // const response = await Person.deleteOne({ _id: delId });
    const response = await Person.findByIdAndDelete(delId);
    if (response.deletedCount === 0) {
      console.log("Bad request: person not found");
      return res.status(404).json({ message: "person not found" });
    }
    console.log("entry deleted ", response);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server erro" });
  }
});

module.exports = router;
