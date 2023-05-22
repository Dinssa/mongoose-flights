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
        flights: await Flight.find({}).sort({ departs: 1 }),
        navLinks: [
            { link: 'flights/new', title: 'Add Flight' },
        ]
    });
}

async function newFlight(req, res) {
    // TODO: set default time to 24hrs format
    const { departs : dt } = new Flight();
    const defaultDate = moment(dt).format('yyyy-MM-DDTHH:mm');
    console.log(defaultDate);
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
        const { departs : dt } = new Flight();
        const defaultDate = moment(dt).format('yyyy-MM-DDTHH:mm');
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