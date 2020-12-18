//require express
const express = require("express");

const router = express.Router();

//require the data
const db = require("./models");

/* Create routes */

//new
router.get("/new", (req, res) => {
    //res.render("travelers/new");     until the view is created
});

//create
router.post("/new", async (req, res) => {
    
    try {
        //req.body.createdBy = req.session.currentUser.id;
        await db.Traveler.create(req.body);
        return res.redirect("/");
    } catch (err) {
        return res.send(err);
    };
});

//show
router.get("/:id", (req, res) => {
    res.send("you are on the index page")
});

//edit
router.get("/:id/edit", (req, res) =>{

});

//update
router.put("/:id", (req, res) => {

});

//delete
router.delete("/:id", (req, res) => {

});

//export router
module.exports = router;