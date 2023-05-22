const Flight = require('../models/flight');

module.exports = {
    index,
    new: newFlight,
}

async function index(req, res) {
    res.render('flights/index', { 
        title: 'All Flights', 
        flights: await Flight.find({}),
        navLinks: [
            { link: 'flights/new', title: 'Add Flight' },
        ]
    });
}

async function newFlight(req, res) {
    res.render('flights/new', { 
        title: 'Add Flight', 
        navLinks: [
            { link: 'flights', title: 'All Flights' },
        ] 
    });
}