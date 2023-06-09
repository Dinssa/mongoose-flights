const Flight = require('../models/flight');

module.exports = {
    create
}

async function create(req, res) {

    const { id } = req.params;

    try {
        const flight = await Flight.findById(id);

        flight.destinations.push(req.body);
        
        await flight.save();
    } catch (err) {
        console.log(err);
    }
    
    res.redirect(`/flights/${id}`);

}