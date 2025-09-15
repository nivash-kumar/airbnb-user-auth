const mongoose = require("mongoose");

const homeSchema = mongoose.Schema({
    houseName: {
        type: String,
        required: true,
    },
    ownerName:String,
    price: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
        required:true,
    },
    address: String,
    rating: {
        type: Number,
        required: true,
    },
    photo: String,
    rulesPdf: String,
    description: String,
});

module.exports = mongoose.model("Home", homeSchema);