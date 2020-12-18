//bring in mongoos
const mongoose = require("mongoose");

//create schema for user documents
const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, minlength: 8}
},
{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;