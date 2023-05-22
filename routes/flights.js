const express = require('express');
const router = express.Router();

const flightsCtrl = require('../controllers/flights');

// Get /flights
router.get('/', flightsCtrl.index);

// Get /flights/new
router.get('/new', flightsCtrl.new);

// POST /flights
router.post('/', flightsCtrl.create);

module.exports = router;
