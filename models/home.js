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
    // contactNumber:Number,
    description: String,
});

homeSchema.pre("findOneAndDelete",async function(next) {
    const homeId = this.getQuery()._id;
    await Favourite.deleteMany({homeId: homeId});
    next();
});

module.exports = mongoose.model("Home", homeSchema);