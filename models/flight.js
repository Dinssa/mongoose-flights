const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FlightSchema = new Schema({
    airline: {
        type: String,
        enum: ['British Airways', 'Virgin Atlantic', 'Emirates', 'EasyJet', 'Ryanair']
    },
    airport: {
        type: String,
        enum: ['LHR', 'LGW', 'CDG', 'AMS', 'FRA', 'FCO', 'DUB', 'JFK'],
        default: 'LHR'
    },
    flightNo: {
        type: Number,
        min: 10,
        max: 9999
    },
    departs: {
        type: Date,
        default: function() {
            return new Date(new Date().setFullYear(new Date().getFullYear() + 1));
        }
    }
});