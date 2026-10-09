require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Notice = require("./models/Notice");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/department_notice_board";

// Middleware
app.use(cors());
app.use(express.json());

// Home page
app.get("/", (req, res) => {
  res.send("Welcome to Department Notice Board");
});

// Faculty page
app.get("/faculty", (req, res) => {
  const faculty = ["Dr. Kumar", "Dr. Priya", "Prof. Ravi", "Prof. Meena"];

  const items = faculty.map((name) => `<li>${name}</li>`).join("");

  res.send(`
    <h1>Faculty Members</h1>
    <ul>${items}</ul>
  `);
});

// GET /api/notices - retrieve all notices (returns [] when there are none)
app.get("/api/notices", async (req, res) => {
  try {
    const notices = await Notice.find();
    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: "Failed to load notices" });
  }
});

// POST /api/notices - save a new notice
app.post("/api/notices", async (req, res) => {
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

// Connect to MongoDB (database: department_notice_board), then start the server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected: department_notice_board");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });
