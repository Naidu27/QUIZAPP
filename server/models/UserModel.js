const { db } = require("../config/db");

const findUserByUsername = (username, callback) => {
  db.query("SELECT * FROM users WHERE username = ?", [username], callback);
};

const createUser = (username, hashedPassword, callback) => {
  db.query(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, hashedPassword],
    callback
  );
};

module.exports = { findUserByUsername, createUser };
