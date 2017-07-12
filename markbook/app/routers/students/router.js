const express = require('express');
const router = new express.Router();

/* GET students page. */
router.get('/students', (req, res) => {
  res.render('students/all', { title: 'List all students' });
});

/* GET student details page. */
router.get('/students/:id', (req, res) => {
  res.render('students/details', { title: 'Student' });
});

module.exports = router;
