require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const rateLimit = require("express-rate-limit");
const fs = require("fs");
const path = require("path");

const app = express();

/* IMPORTANT FIX FOR RAILWAY / PROXY */
app.set("trust proxy", 1);

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

/* ---------------- RATE LIMITER ---------------- */

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit login attempts
  message: {
    message: "Too many login attempts. Try again later."
  }
});

/* ---------------- LOAD USERS ---------------- */

const usersPath = path.join(__dirname, "users.json");
const users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));

/* ---------------- HEALTH CHECK ROUTE ---------------- */

app.get("/", (req, res) => {
  res.send("Login API is running");
});

/* ---------------- LOGIN ROUTE ---------------- */

app.post("/login", loginLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const match = await bcrypt.compare(password, user.passwordHash);

    if (!match) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    return res.status(200).json({
      message: "Login successful",
      username: user.username
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error"
    });
  }
});

/* ---------------- START SERVER ---------------- */

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});