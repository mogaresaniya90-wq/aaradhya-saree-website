require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Aaradhya Saree Backend is running!"
  });
});

app.get("/api/health", async (req, res) => {
  try {
    await db.query("SELECT 1");

    res.json({
      status: "ok",
      database: "connected"
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      database: "connection failed",
      message: error.message
    });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const [products] = await db.query(
      "SELECT * FROM products ORDER BY id ASC"
    );

    res.json(products);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch products"
    });
  }
});

app.post("/api/auth/signup", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password
    } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const [existingUsers] = await db.query(
      "SELECT id FROM users WHERE email = ?",
      [normalizedEmail]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        message: "Email already registered"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      `INSERT INTO users
      (name, email, phone, password)
      VALUES (?, ?, ?, ?)`,
      [
        name.trim(),
        normalizedEmail,
        phone.trim(),
        hashedPassword
      ]
    );

    const user = {
      id: result.insertId,
      name: name.trim(),
      email: normalizedEmail,
      phone: phone.trim(),
      role: "CUSTOMER"
    };

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn:
          process.env.JWT_EXPIRES_IN || "7d"
      }
    );

    res.status(201).json({
      message: "Account created successfully",
      token,
      user
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Signup failed"
    });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const normalizedEmail =
      email.trim().toLowerCase();

    const [users] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [normalizedEmail]
    );

    if (users.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const userFromDatabase = users[0];

    const passwordMatch =
      await bcrypt.compare(
        password,
        userFromDatabase.password
      );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const user = {
      id: userFromDatabase.id,
      name: userFromDatabase.name,
      email: userFromDatabase.email,
      phone: userFromDatabase.phone,
      role: userFromDatabase.role
    };

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn:
          process.env.JWT_EXPIRES_IN || "7d"
      }
    );

    res.json({
      message: "Login successful",
      token,
      user
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Login failed"
    });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(
    `Aaradhya Backend running on http://localhost:${PORT}`
  );
});