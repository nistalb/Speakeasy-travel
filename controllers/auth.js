//require express
const express = require("express");

const router = express.Router();

//require the data
//const db = require("../models");

/* Create routes */

//register
router.post("/register", (req, res) => {
    res.send("On the register page")
});

//login
router.get("/login", (req, res) => {

});

//verify login information
router.post("/login", (req, res) => {

})

//delete
router.delete("/logout", (req, res) => {

});


//export router
module.exports = router;