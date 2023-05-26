const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const destinationSchema = new Schema({
    airport: {
        type: String,
        enum: ['LHR', 'LGW', 'CDG', 'AMS', 'FRA', 'FCO', 'DUB', 'JFK'],
        required: true
    },
    arrival: {
        type: Date,
        default: function() {
            return new Date(new Date().setFullYear(new Date().getFullYear() + 2));
        },
        required: true
    }
});

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
        max: 9999,
        required: true
    },
    departs: {
        type: Date,
        default: function() {
            return new Date(new Date().setFullYear(new Date().getFullYear() + 1));
        },
        required: true
    },
    destinations: [destinationSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Flight', FlightSchema);