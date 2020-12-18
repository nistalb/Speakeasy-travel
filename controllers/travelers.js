//require express
const express = require("express");

const router = express.Router();

//require the data
const db = require("../models");

/* Create routes */

//new
router.get("/new", (req, res) => {
    res.render("traveler/new");     
});

//create
router.post("/new", async (req, res) => {
    
    try {
        req.body.createdBy = req.session.currentUser.id;   
        await db.Traveler.create(req.body);
        return res.redirect("/show");
    } catch (err) {
        return res.send(err);
    };
});

//show
router.get("/", async (req, res) => {
    
    try {
        const foundTraveler = await db.Traveler.findById( {createdBy: req.session.currentUser.id} );

        const context = {traveler: foundTraveler};
        return res.render("traveler/show", context);

    } catch (err) {
        return res.send(err);
    };
});

//edit
router.get("/edit", async (req, res) =>{

    try {
        const foundTraveler = await db.Traveler.findById( {createdBy: req.session.currentUser.id} );
        
        const context = { traveler: foundTraveler };
        return res.render("traveler/edit", context);
    } catch (err) {
        return res.send(err);
    };
});

//update
router.put("/", async (req, res) => {

    try {
        await db.Traveler.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.redirect(`/`)
    } catch (err) {
        return res.send(err);
    };
});

//delete
router.delete("/", (req, res) => {

});

//export router
module.exports = router;