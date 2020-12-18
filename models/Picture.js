// require mongoose
const mongoose = require("mongoose");

// schema
const pictureSchema = mongoose.Schema(
    {
        name: String,
        description: String,
        img:{data: Buffer, contentType: String, required: true},

    },
    {
        timestamps: true,
    }
);

// model
const Picture = mongoose.model("Picture", pictureSchema);

// export
module.exports = Picture;