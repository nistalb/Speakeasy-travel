// require mongoose
const mongoose = require("mongoose");
const Picture = require("./Picture");
const PictureSchema = mongoose.model("Picture").schema;
// schema
const tripSchema = new mongoose.Schema(
    {
        dateStart: Date,
        dateEnd: Date,
        body: String,
        activities: [String],
        notes: String,
        location: String,
        budget: Number,
        img: [PictureSchema],

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