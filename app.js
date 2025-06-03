const express = require('express');
const router = express.Router();
const User = require('./track');

// Create a new user
router.post('/users', async (req, res) => {
  const user = new User({ username: req.body.username });
  await user.save();
  res.json({ username: user.username, _id: user._id });
});

// Get all users
router.get('/', async (req, res) => {
  const users = await User.find({}, 'username _id');
  res.json(users);
});

// Add exercise
router.post('/users/:id/exercises', async (req, res) => {
  const { description, duration, date } = req.body;
  const user = await User.findById(req.params.id);
  const exerciseDate = date ? new Date(date) : new Date();
  const formattedDate = exerciseDate.toDateString();

  user.log.push({
    description,
    duration: parseInt(duration),
    date: formattedDate
  });

  await user.save();

  res.json({
    username: user.username,
    description,
    duration: parseInt(duration),
    date: formattedDate,
    _id: user._id
  });
});

// Get user log
router.get('/users/:id/logs', async (req, res) => {
  const user = await User.findById(req.params.id);
  const { from, to, limit } = req.query;

  let log = user.log;

  if (from) log = log.filter(e => new Date(e.date) >= new Date(from));
  if (to) log = log.filter(e => new Date(e.date) <= new Date(to));
  if (limit) log = log.slice(0, parseInt(limit));

  res.json({
    username: user.username,
    count: log.length,
    _id: user._id,
    log
  });
});

module.exports = router;
