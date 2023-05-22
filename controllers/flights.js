const Flight = require('../models/flight');

module.exports = {
    index,
    new: newFlight,
    create
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
            { link: 'flights', title: 'All Flights'},
        ],
        errorMessage: ''
    });
}

async function create(req, res) {
    try {
        await Flight.create(req.body);
        res.redirect('/flights');
    } catch (err) {
        res.render('flights/new', {
            title: 'Add Flight',
            navLinks: [
                { link: 'flights', title: 'All Flights'},
            ],
            errorMessage: err.message
        });
    }
}