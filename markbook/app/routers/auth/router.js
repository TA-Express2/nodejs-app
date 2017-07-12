const express = require('express');
const router = new express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('home', { title: 'Home' });
});

/* GET register page. */
router.get('/register', (req, res) => {
  res.render('auth/register', { title: 'Register' });
});

/* GET login page. */
router.get('/login', (req, res) => {
  res.render('auth/login', { title: 'Login' });
});

module.exports = router;
