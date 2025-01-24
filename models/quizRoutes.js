// server/routes/quizRoutes.js

const express = require('express');
const quiz = require('../models/quiz');
const router = express.Router();

// Get all quiz questions
router.get('/', async (req, res) => {
  try {
    const questions = await Quiz.find();
    res.json(questions);
  } catch (err) {
    res.status(500).send('Error fetching quiz questions');
  }
});

// Submit quiz answers and calculate score
router.post('/submit', async (req, res) => {
  const { answers } = req.body;  // Assume answers is an array of selected answers
  let score = 0;
  
  try {
    const questions = await Quiz.find();

    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score++;
      }
    });

    res.json({ score });
  } catch (err) {
    res.status(500).send('Error processing quiz submission');
  }
});

module.exports = router;
