const Flight = require('../models/flight');
const moment = require('moment');

module.exports = {
    index,
    new: newFlight,
    create,
    show
}

async function index(req, res) {
    res.render('flights/index', { 
        title: 'All Flights', 
        flights: await Flight.find({}).sort({ departs: 1 }),
        navLinks: [
            { link: 'flights/new', title: 'Add Flight' },
        ],
        currentDate: new Date()
    });
}

async function show(req, res) {
    const flight = await Flight.findById(req.params.id);
    res.render('flights/show', { 
        title: 'Flight Details', 
        flight,
        navLinks: [
            { link: 'flights', title: 'All Flights'},
            { link: 'flights/new', title: 'Add Flight' },
        ],
        currentDate: new Date()
    });
}

async function newFlight(req, res) {
    // TODO: set default time to 24hrs format
    const { departs : dt } = new Flight();
    const defaultDate = moment(dt).format('yyyy-MM-DDTHH:mm');
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

        switch (err.name) {
            case 'ValidationError':
                if (!!err.errors.departs) {
                    err.message = 'Departure date must be a valid date';
                }
                if (!!err.errors.airport) {
                    err.message = 'Destination Airport must be selected from our approved list';
                }
                if (!!err.errors.airline) {
                    err.message = 'Airline must be selected from our approved list';
                }
                if (!!err.errors.flightNo) {
                    err.message = 'Flight number must be entered & a number between 10 and 9999';
                }
        }
        
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