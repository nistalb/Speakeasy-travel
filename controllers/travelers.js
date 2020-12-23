//require express
const express = require("express");

const router = express.Router();

//require the data
const db = require("../models");

/* Create routes */

//index
router.get("/", async (req, res) => {
   
    try {
        const traveler = await db.Traveler.find( {createdBy: req.session.currentUser.id});

        const context = {traveler: traveler};
        return res.render("traveler/index", context);
    } catch (err) {
        return res.send(err);
    }; 
});

//new
router.get("/new", (req, res) => {
   res.render("traveler/new");     
});

//create
router.post("/", async (req, res) => {
    
     try {
        req.body.createdBy = req.session.currentUser.id;  
        await db.Traveler.create(req.body);
        return res.redirect("/traveler");
    } catch (err) {
        return res.send(err);
    };
});

//edit
router.get("/:id/edit", async (req, res) =>{

    try {
        
        const foundTraveler = await db.Traveler.findById( req.params.id );
        
        const context = { traveler: foundTraveler };
        return res.render("traveler/edit", context);
    } catch (err) {
        return res.send(err);
    };
});

//update
router.put("/:id", async (req, res) => {

    try {
        await db.Traveler.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.redirect("/traveler")
    } catch (err) {
        return res.send(err);
    };
});

//delete
router.delete("/:id", async (req, res) => {

    try {
        await db.Traveler.findByIdAndDelete(req.params.id);
        await db.Trip.remove({createdBy: req.session.currentUser.id});
        await db.User.remove({_id: req.session.currentUser.id});
        req.session.destroy();
        return res.redirect("/");

    } catch (err) {
        return res.send(err);
    };
});

//export router
module.exports = router;