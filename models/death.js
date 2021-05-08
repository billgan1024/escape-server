const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const death = new Schema({
    level: { type: Number, required: true },
    x: { type: Number, required: true },
    y: { type: Number, required: true }
}, {
    timestamps: true,
});

const Death = mongoose.model('Death', userSchema);

module.exports = Death;