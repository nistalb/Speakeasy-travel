//require express
const express = require("express");

const router = express.Router();

//require the data
//const db = require("./models");

/* Create routes */

//register
router.get("/register", (req, res) => {
    res.send("On the register page")
});

//login

//delete



//export router
module.exports = router;