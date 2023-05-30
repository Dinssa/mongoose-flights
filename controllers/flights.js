const Flight = require('../models/flight');
const Ticket = require('../models/ticket');
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
    const tickets = await Ticket.find({flight: flight._id});
    const { departs : dt } = new Flight(); // TODO: Change this to default arrival date in destination schema
    const defaultDate = moment(dt).format('yyyy-MM-DDTHH:mm');

    let airportsAlreadyUsed = []
    let airportsToSelect = flight.constructor.schema.path('airport').enumValues; // all airports in destination schema
    airportsAlreadyUsed.push(flight.airport) // add current airport
    airportsAlreadyUsed.push(...flight.destinations.map((destination) => {return destination.airport})) // add all airports in destinations
    // remove all airports already used
    airportsToSelect = airportsToSelect.filter((airport) => {
        return !airportsAlreadyUsed.includes(airport);
    });

    flight.destinations.sort((a, b) => {
        return a.arrival - b.arrival;
    });

    if (tickets.length > 0){
        const ticketRegex = tickets[0].constructor.schema.path('seat').validators[0].regexp;
        tickets.sort((a, b) => {
            const seatA = ticketRegex.test(a.seat) ? a.seat.charCodeAt(0) * 100 + parseInt(a.seat.slice(1)) : Infinity;
            const seatB = ticketRegex.test(b.seat) ? b.seat.charCodeAt(0) * 100 + parseInt(b.seat.slice(1)) : Infinity;
            return seatA - seatB;
        });
    }    

    res.render('flights/show', { 
        title: 'Flight Details', 
        flight,
        tickets,
        navLinks: [
            { link: 'flights', title: 'All Flights'},
            { link: 'flights/new', title: 'Add Flight' },
        ],
        currentDate: new Date(),
        defaultDate,
        airportsToSelect
    });
}

async function newFlight(req, res) {
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