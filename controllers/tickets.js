const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    create,
    new: newTicket
}

async function create(req, res) {

    const { id } = req.params;

    // Add flight id to req.body
    req.body.flight = id;

    try {
        await Ticket.create(req.body);
        
        res.redirect(`/flights/${id}`);
    } catch (err) {
        console.log(err);
        const flight = await Flight.findById(req.params.id);
        res.render('tickets/new', { 
            title: 'Add Ticket',
            flight,
            navLinks: [
                { link: 'flights', title: 'All Flights'},
                { link: `flights/${flight._id}`, title: 'Back to Flight'}
            ],
            errorMessage: err.message
        });
    }
    
}

async function newTicket(req, res) {
    const flight = await Flight.findById(req.params.id);
    res.render('tickets/new', { 
        title: 'Add Ticket',
        flight,
        navLinks: [
            { link: 'flights', title: 'All Flights'},
            { link: `flights/${flight._id}`, title: 'Back to Flight'}
        ],
        errorMessage: ''
    });

}