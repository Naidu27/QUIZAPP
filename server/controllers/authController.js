const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const UserModel = require("../models/UserModel");

const signup = (req, res) => {
  const { username, password } = req.body;

  UserModel.findUserByUsername(username, async (err, result) => {
    if (result.length > 0) return res.status(400).json({ msg: "Username already exists! Please choose another one" });

    const hashedPassword = await bcrypt.hash(password, 10);
    UserModel.createUser(username, hashedPassword, (err, result) => {
      if (err) return res.status(500).json({ msg: "Error creating user" });

      const token = generateToken(result.insertId);
      res.json({ token, username });
    });
  });
};

const login = (req, res) => {
  const { username, password } = req.body;

  UserModel.findUserByUsername(username, async (err, result) => {
    if (err || result.length === 0) return res.status(400).json({ msg: "User not found" });

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = generateToken(user.id);
    res.json({ token, username });
  });
};

module.exports = { signup, login };
