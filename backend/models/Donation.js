const mongoose = require('mongoose');

const donationSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        sum: {
            type: Number,
            required: [true, 'Please add a sum'],
        },
        dedication: {
            type: String,
        },
        date: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);
module.exports = mongoose.model('Donation', donationSchema);