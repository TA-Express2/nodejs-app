var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
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

/* GET students page. */
router.get('/students', (req, res) => {
  res.render('students/all', { title: 'List all students' });
});

/* GET student details page. */
router.get('/students/:id', (req, res) => {
  res.render('students/details', { title: 'Student' });
});

module.exports = router;
