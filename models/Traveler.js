//bring in mongoose
const mongoose = require("mongoose");

//create schema for traveler documents
const travelerSchema = new mongoose.Schema({
    name: {type: String, required: true},
    bio: String,
    address: {street: String, city: String, state: String, country: String},
    trips: [ {type: mongoose.Schema.Types.ObjectId, ref: "Trip"} ],   
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},
{ timestamps: true }
);

const Traveler = mongoose.model("Traveler", travelerSchema);

module.exports = Traveler;