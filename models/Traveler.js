//bring in mongoose
const mongoose = require("mongoose");

//create schema for traveler documents
const travelerSchema = new mongoose.Schema({
    name: {type: String, required: true},
    bio: String,
    address: {street: String, city: String, state: String, country: String},
    //trips: []   add reference from trips
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},
{timestamp: true}
);

const Traveler = mongoose.model("Traveler", travelerSchema);

module.exports = Traveler;