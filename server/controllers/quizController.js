const QuizModel = require("../models/QuizModel");

const getCategories = (req, res) => {
  QuizModel.getAllCategories((err, results) => {
    if (err) return res.status(500).json({ msg: "Error fetching categories" });
    res.json(results);
  });
};

const getQuestions = (req, res) => {
  const categoryId = req.query.category;
  if (!categoryId) return res.status(400).json({ msg: "Category ID is required" });

  QuizModel.getQuestionsByCategory(categoryId, (err, results) => {
    if (err) return res.status(500).json({ msg: "Error fetching questions" });

    const questions = results.map(q => ({
      id: q.id,
      question: q.question,
      options: JSON.parse(q.options),
      answer: q.answer
    }));

    res.json(questions);
  });
};

const submitScore = (req, res) => {
  const userId = req.user.id;
  const { categoryId, score, timeTaken, totalQuestions } = req.body;

  if (!categoryId || score == null || timeTaken == null || totalQuestions == null) {
    return res.status(400).json({ msg: "Missing fields in request body" });
  }

  QuizModel.insertScore(userId, categoryId, score, timeTaken, totalQuestions, (err, result) => {
    if (err) return res.status(500).json({ msg: "Error saving score" });
    res.json({ msg: "Score submitted successfully" });
  });
};

const getLeaderboard = (req, res) => {
  const categoryId = req.params.id;

  if (!categoryId) return res.status(400).json({ msg: "Category ID is required" });

  QuizModel.getTopScores(categoryId, (err, results) => {
    if (err) return res.status(500).json({ msg: "Error fetching leaderboard" });
    res.json(results);
  });
};

const getUserScoreHistory = (req, res) => {
  const userId = req.user.id;

  QuizModel.getUserScores(userId, (err, results) => {
    if (err) return res.status(500).json({ msg: "Error fetching user scores" });

    res.json(results);
  });
};


module.exports = {
  getCategories,
  getQuestions,
  submitScore,
  getLeaderboard,
  getUserScoreHistory
};
