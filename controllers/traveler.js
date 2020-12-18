//require express
const express = require("express");

const router = express.Router();

//require the data
//const db = require("./models");

/* Create routes */

//new
router.get("/new", (req, res) => {
    res.send("You are on the new traveler page")
});

//create

//show

//edit

//update

//delete

//export router
module.exports = router;