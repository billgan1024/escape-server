const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const success = new Schema({
    level: { type: Number, required: true },
    attempts: { type: Number, required: true },
    duration: { type: Number, required: true }
}, {
    timestamps: true,
});

const Success = mongoose.model('Success', userSchema);

module.exports = Success;