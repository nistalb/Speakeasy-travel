// require mongoose
const mongoose = require("mongoose");

// schema
const tripSchema = mongoose.Schema(
    {
        dateStart: Date,
        dateEnd: Date,
        activities: [String],
        notes: String,
        location: String,
        budget: Number,
        pictures: [embed, Picture],
        createdTrip: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }

    },
    {
        timestamps: true
    }
);

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;