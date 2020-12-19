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
router.get("/", async (req, res) => {
    
    try {
        const allTrips = await db.Trip.find({createdBy: req.session.currentUser.id});

        const context = {trip: allTrips};
        console.log(context);
        return res.render("trips/index", context);
    } catch (err) {
        return res.send(err);
    };   
  
});

//new
router.get("/new", (req, res) => {
    
    res.render("trips/new");
}); 


//create
router.post("/", async (req, res) => {
    
    try{
        req.body.createdBy = req.session.currentUser.id;
        await db.Trip.create(req.body);
        return res.redirect("/trip");
    } catch (err) {
        return res.send (err)
    };
});

//show
router.get("/:id", async (req, res) => {
    
    try {
        const foundTrip = await db.Trip.findById(req.params.id);

        const context = {trip: foundTrip};
        return res.render("trips/show", context);

    } catch(err) {
        return res.send(err);
    };
});

//edit
router.get("/:id/edit", (req, res) =>{

    db.Trip.findById(req.params.id, function(err, foundTrip){
        if (err) return res.send(err);
        console.log(foundTrip);
        const context = {trip: foundTrip};
        res.render("trips/edit", context);
    });

});

//update
router.put("/:id",  async (req, res) => {
    
    try {
        console.log(req.body);
        console.log(req.params.id);
        const updatedTrip = await db.Trip.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.redirect(`/trips/${updatedTrip._id}`)
    } catch (err) {
        return res.send(err);
    };
    
    /* db.Trip.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
                ...req.body,
            }
        },
        { new: true},
        function(err, updatedTrip){
            if(err) return res.send(err);

            return res.redirect(`/trips/${updatedTrip._id}`);
        }
    ); */
});

//delete
router.delete("/:id", async (req, res) => {
   
    try {
        await db.Trip.findByIdAndDelete(req.params.id);
        return res.redirect("/");
    } catch (err) {
        return res.send(err);
    }
   
    /*  db.Trip.findByIdAndDelete(req.params.id, function(err, deletedTrip){
        if(err) return res.send(err);

        dbTraveler.findById(deletedTrip.traveler, function(err, foundTraveler){
            foundTraveler.trips.remove(deletedTrip);
            foundTraveler.save();

            return res.redirect("/trips");
        });
    }); */

});

//export router
module.exports = router;