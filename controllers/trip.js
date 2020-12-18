//require express
const express = require("express");

const router = express.Router();

//require the data
//const db = require("./models");

/* Create routes */

//index
router.get("/", (req, res) => {
    res.send("we are on the trip index page!")
});

//new
router.get("/new", (req, res) => {
    res.send("You are on the new trip page")
});

//create
router.post("/new", (req, res) => {
    
});

//show
router.get("/:id", (req, res) => {
    res.send("you are on the trip show page")
});

//edit
router.get("/:id/edit", (req, res) =>{

});

//update
router.push("/:id", (req, res) => {

});

//delete
router.delete("/:id", (req, res) => {

});

//export router
module.exports = router;