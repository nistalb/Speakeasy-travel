// require mongoose
const mongoose = require("mongoose");

// schema
const pictureSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        img:{data: Buffer, contentType: String},

    },
    {
        timestamps: true,
    }
);

// model
const Picture = mongoose.model("Picture", pictureSchema);

// export
module.exports = Picture;