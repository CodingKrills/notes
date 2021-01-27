const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated, isLoggedin } = require('../config/auth');

// Welcome Page
router.get('/', isLoggedin, (req, res) => res.render('welcome', { user: req.user }));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

module.exports = router;
