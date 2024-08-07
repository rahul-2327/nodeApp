const express = require("express");
const router = express.Router();
const Menu = require("./../models/menu");

router.get("/", async (req, res) => {
  try {
    const response = await Menu.find();
    console.log("data fetched from database ", response);
    res.status(200).json(response);
  } catch (err) {
    console.log("internal server error ", err);
    res.status(500).json({ message: "internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new Menu(data);
    const response = await newMenu.save();
    console.log("menu inserted: ", response);
    res.status(200).json(response);
  } catch (err) {
    console.log("internal server error ", err);
    res.status(500).json({ message: "internal pointer variable" });
  }
});

router.get("/:taste", async (req, res) => {
  try {
    const isTaste = req.params.taste;
    const response = await Menu.find({ taste: isTaste });

    if (!isTaste) {
      console.log("404 req not found");
      return res.status(200).json({ message: "404 req not found" });
    }

    console.log("data fetched ", response);
    res.status(200).json(response);
  } catch (err) {
    console.log("internal server error", err);
    res.status(500).json({ message: "internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const menuId = req.params.id;
    const updatedMenu = req.body;
    const response = await Menu.findByIdAndUpdate(menuId, updatedMenu, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      console.log("404 req not found");
      return res.status(200).json({ message: "404 req not found" });
    }
    console.log("updation successful ", response);
    res.status(200).json(response);
  } catch (err) {
    console.log("internal server error", err);
    res.status(500).json({ message: "internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const idToDelete = req.params.id;
    const response = await Menu.deleteOne({ _id: idToDelete });
    if (!response) {
      console.error("error 404 bad request: Invalid request type ", response);
      res.status(404).json({ message: "Invalid delete Id" });
    }
    console.log("entry deleted successfully ", response);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server erro" });
  }
});

module.exports = router;
