const Flight = require('../models/flight');
const moment = require('moment');

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
    const defaultDate = moment(new Flight().departs).format('yyyy-MM-DDTHH:mm');
    res.render('flights/new', { 
        title: 'Add Flight', 
        navLinks: [
            { link: 'flights', title: 'All Flights'},
        ],
        errorMessage: '',
        defaultDate
    });
}

async function create(req, res) {
    try {
        await Flight.create(req.body);
        res.redirect('/flights');
    } catch (err) {
        const defaultDate = moment(new Flight().departs).format('yyyy-MM-DDTHH:mm');
        res.render('flights/new', {
            title: 'Add Flight',
            navLinks: [
                { link: 'flights', title: 'All Flights'},
            ],
            errorMessage: err.message,
            defaultDate
        });
    }
}