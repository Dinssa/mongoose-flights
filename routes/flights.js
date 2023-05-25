const express = require('express');
const router = express.Router();

const flightsCtrl = require('../controllers/flights');

// Get /flights
router.get('/', flightsCtrl.index);

// Get /flights/new
router.get('/new', flightsCtrl.new);

router.get('/:id', flightsCtrl.show);

// POST /flights
router.post('/', flightsCtrl.create);

module.exports = router;
