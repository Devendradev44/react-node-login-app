// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");

// const app = express();

// app.use(cors());
// app.use(bodyParser.json());

// const PORT = 5000;

// const bcrypt = require("bcrypt");

// // Login API
// app.post("/login", (req, res) => {
//   const { username, password } = req.body;

//   if (username === "admin" && password === "admin") {
//     return res.status(200).json({
//       success: true,
//       message: "Login successful",
//     });
//   }

//   return res.status(401).json({
//     success: false,
//     message: "Invalid username or password",
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });











// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");
// const bcrypt = require("bcrypt");
// const rateLimit = require("express-rate-limit");
// const fs = require("fs");

// const app = express();

// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 5000;

// /* ---------------- RATE LIMIT ---------------- */

// const loginLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 50,
//   message: "Too many login attempts. Try again later."
// });

// /* ---------------- LOAD USERS ---------------- */

// const users = JSON.parse(fs.readFileSync("./users.json"));

// /* ---------------- LOGIN API ---------------- */

// app.post("/login", loginLimiter, async (req, res) => {
//   const { username, password } = req.body;

//   const user = users.find(u => u.username === username);

//   if (!user) {
//     return res.status(401).json({
//       message: "Invalid credentials"
//     });
//   }

//   const match = await bcrypt.compare(password, user.passwordHash);

//   if (!match) {
//     return res.status(401).json({
//       message: "Invalid credentials"
//     });
//   }

//   res.status(200).json({
//     message: "Login successful"
//   });
// });

// /* ---------------- HASH PASSWORD ON START ---------------- */

// async function initializeUsers() {
//   for (let user of users) {
//     if (!user.passwordHash) {
//       const hash = await bcrypt.hash(user.password, 10);
//       user.passwordHash = hash;
//     }
//   }
// }

// initializeUsers();

// /* ---------------- SERVER ---------------- */

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });








require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const rateLimit = require("express-rate-limit");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

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