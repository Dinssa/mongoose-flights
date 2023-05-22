const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Express',
    navLinks: [
      { link: 'flights', title: 'All Flights' },
    ] 
  });
});

module.exports = router;
