// routes/auth.js
const express = require('express');
const passport = require('passport');
const User = require('../models/User');

const router = express.Router();

// Rute untuk mendaftar
router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = new User({ email, password });
    await user.save();
    res.redirect('/login');
  } catch (err) {
    res.render('register', { error: err.message });
  }
});

// jalur asup
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true // flash
}));

// jalan kaluar
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
