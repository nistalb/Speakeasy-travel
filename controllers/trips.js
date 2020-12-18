//require express
const express = require("express");

const router = express.Router();

const db = require("../models");

//require the data
//const db = require("../models");

// Rest Routes
/*
 * Index - GET - /articles  - Presentational - respond with all articles
 * New - GET - /articles/new  - Presentational Form - a page with a form to create a new article
 * Show - GET - /articles/:id  - Presentational - respond with specific article by id
 * Create - Post - /articles  - Functional - recieve data from new route to create a article
 * Edit - GET - /articles/:id/edit  - Presentational Form - respond with a form prefilled with article data
 * Update - PUT - /articles/:id  - Functional - recieve data from edit to update a specific article
 * Delete - DELETE - /articles/:id  - Functional - Deletes article by id from request
 */


/* Create routes */

//index
router.get("/", (req, res) => {
    db.Trip.find({}, function(error, foundTrips){
        if (error) return res.send(error);

        const context = {
            trips: foundTrips,
        };
        res.render("trips/index", context);
    });
  
});

//new
router.get("/new", (req, res) => {
    db.Trip.find({createdBy: req.session.currentUser.id}, function(err, foundTrips){
        if (err) return res.send(err);

        const context = {
            trips: foundTrips,
        };
        res.render("trips/new", context);
    });
});

//create
router.post("/", (req, res) => {
    db.Trip.create(req.body, function(err, createdTrip){
        if (err) return res.send(err);

        db.Trip.findById(createdTrip.traveler).exec(function(err, foundTraveler){
            if(err) return res.send(err);
            foundTraveler.trips.push(createdTrip);
            foundTraveler.save();

            return res.redirect("/trips");
        });
    });
    
});

//show
router.get("/:id", async (req, res) => {
    try {
        const foundTrip = await db.Trip.findById(req.params.id);

        const context = {picture: foundPic};
        return res.render("trips/show", context);

    
    } catch(err) {
        return res.send(err);
    }
});

//edit
router.get("/:id/edit", (req, res) =>{
    db.Trip.findById(req.params.id, function(err, foundTrip){
        if (err) return res.send(err);

        const context = {trip: foundTrip};
        res.render("trips/edit", context);
    });

});

//update
router.put("/:id", (req, res) => {
    db.Trip.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
                ...req.body,
            },
        },
        { new: true},
        function(err, updatedTrip){
            if(err) return res.send(err);

            return res.redirect(`/trips/${updatedTrip._id}`);
        }
    );
});

//delete
router.delete("/:id", (req, res) => {
    db.Trip.findByIdAndDelete(req.params.id, function(err, deletedTrip){
        if(err) return res.send(err);

        dbTraveler.findById(deletedTrip.traveler, function(err, foundTraveler){
            foundTraveler.trips.remove(deletedTrip);
            foundTraveler.save();

            return res.redirect("/trips");
        });
    });

});

//export router
module.exports = router;