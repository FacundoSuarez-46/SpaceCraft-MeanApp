const mongoose = require("mongoose");

var Gas = mongoose.model('Gas', {
    name: { type: String },
    octane: { type: Number },
    detail: { type: String }
});

module.exports = { Gas };