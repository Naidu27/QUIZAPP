const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const UserModel = require("../models/UserModel");

const signup = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: "Username and password are required" });
  }

  UserModel.findUserByUsername(username, async (err, result) => {
    if (err) {
      console.error("Find user error:", err);
      return res.status(500).json({ msg: "Database error" });
    }

    if (result.length > 0) {
      return res
        .status(400)
        .json({ msg: "Username already exists! Please choose another one" });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      UserModel.createUser(username, hashedPassword, (err, result) => {
        if (err) {
          console.error("Create user error:", err);
          return res.status(500).json({ msg: "Error creating user" });
        }

        const token = generateToken(result.insertId);
        res.json({ token, username });
      });
    } catch (error) {
      console.error("Password hashing error:", error);
      res.status(500).json({ msg: "Error creating user" });
    }
  });
};

const login = (req, res) => {
  const { username, password } = req.body;

  UserModel.findUserByUsername(username, async (err, result) => {
    if (err || result.length === 0) {
      return res.status(400).json({ msg: "User not found" });
    }

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = generateToken(user.id);
    res.json({ token, username });
  });
};

module.exports = { signup, login };