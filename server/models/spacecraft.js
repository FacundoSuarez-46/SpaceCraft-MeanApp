const mongoose = require("mongoose");

var Spacecraft = mongoose.model('Spacecraft', {
    name: { type: String },
    type: { type: String },
    weight: { type: Number },
    push: { type: Number },
    gas: { type: String },
    speed: { type: String },
    detail: { type: String }
});

module.exports = { Spacecraft };