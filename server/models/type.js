const mongoose = require("mongoose");

var Type = mongoose.model('Type', {
    name: { type: String },
    detail: { type: String }
});

module.exports = { Type };