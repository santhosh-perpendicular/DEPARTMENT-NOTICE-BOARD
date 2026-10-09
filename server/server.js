require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const noticeRoutes = require("./routes/notices");

const app = express();
const PORT = process.env.PORT || 5000;

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

// Notice APIs (GET /api/notices and POST /api/notices)
app.use("/api/notices", noticeRoutes);

// Connect to MongoDB first, then start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
