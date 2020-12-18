//require express
const express = require("express");

const router = express.Router();

//require the data
const db = require("./models");

/* Create routes */

//index
router.get("/", (req, res) => {
    res.send("we are on the index page!")
});

//new

//create

//show

//edit

//update

//delete

//export router
module.exports = router;