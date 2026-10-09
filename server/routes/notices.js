const express = require("express");
const Notice = require("../models/Notice");

const router = express.Router();

// GET /api/notices - retrieve all notices (returns [] when there are none)
router.get("/", async (req, res) => {
  try {
    const notices = await Notice.find();
    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: "Failed to load notices" });
  }
});

// POST /api/notices - save a new notice
router.post("/", async (req, res) => {
  const title = typeof req.body.title === "string" ? req.body.title.trim() : "";
  const message =
    typeof req.body.message === "string" ? req.body.message.trim() : "";

  // Validation: title and message must not be empty
  if (!title || !message) {
    return res.status(400).json({ message: "Title and message are required" });
  }

  try {
    const notice = await Notice.create({ title, message });
    res.status(201).json(notice);
  } catch (error) {
    res.status(500).json({ message: "Failed to save notice" });
  }
});

module.exports = router;
