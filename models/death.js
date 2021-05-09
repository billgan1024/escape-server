const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const death = new Schema({
    level: { type: Number, required: true },
    xpos: { type: Number, required: true },
    ypos: { type: Number, required: true }
});

const Death = mongoose.model("Death", death);

module.exports = Death;