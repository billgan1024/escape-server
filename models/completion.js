const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const completion = new Schema({
    level: { type: Number, required: true },
    attempts: { type: Number, required: true },
    duration: { type: Number, required: true }
});

const Completion = mongoose.model("Completion", completion);

module.exports = Completion;