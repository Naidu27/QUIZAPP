const { db } = require("../config/db");

const getAllCategories = (callback) => {
  db.query("SELECT * FROM categories", callback);
};

const getQuestionsByCategory = (categoryId, callback) => {
  db.query(
    "SELECT id, question, options, answer FROM questions WHERE category_id = ?",
    [categoryId],
    callback
  );
};

const insertScore = (userId, categoryId, score, timeTaken, totalQuestions, callback) => {
  const query = `
    INSERT INTO scores (user_id, category_id, score, time_taken, total_questions)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(query, [userId, categoryId, score, timeTaken, totalQuestions], callback);
};

const getTopScores = (categoryId, callback) => {
  const query = `
    SELECT u.username, MAX(s.score) as top_score
    FROM scores s
    JOIN users u ON s.user_id = u.id
    WHERE s.category_id = ?
    GROUP BY s.user_id
    ORDER BY top_score DESC
    LIMIT 10
  `;
  db.query(query, [categoryId], callback);
};

const getUserScores = (userId, callback) => {
  const query = `
    SELECT c.name AS category, s.score, s.time_taken, s.total_questions, s.created_at
    FROM scores s
    JOIN categories c ON s.category_id = c.id
    WHERE s.user_id = ?
    ORDER BY s.created_at DESC
  `;
  db.query(query, [userId], callback);
};


module.exports = {
  getAllCategories,
  getQuestionsByCategory,
  insertScore,
  getTopScores,
  getUserScores
};
