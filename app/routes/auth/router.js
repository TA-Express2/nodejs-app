var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
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
