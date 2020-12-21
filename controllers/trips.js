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
router.post("/", (req, res) => {
        
        req.body.createdBy = req.session.currentUser.id;
        db.Trip.create(req.body, function (err, createdTrip) {
            if (err) return res.send(err);
            console.log(createdTrip);
            
            db.Traveler.find({createdBy: req.session.currentUser.id}).exec( function(err, foundTraveler) {
                if (err) return res.send(err);
                foundTraveler[0].trips.push(createdTrip);
                foundTraveler[0].save(); 

                return res.redirect("/trip");
            });
        });
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
router.get("/:id/edit", async (req, res) =>{

    try{
        const foundTrip = await db.Trip.findById(req.params.id);
        const context = { trip: foundTrip };
        return res.render("trips/edit", context);
    } catch (err) {
        return res.send(err)
    };
});

//update
router.put("/:id", async (req, res) => {
    
    try {        
        const updatedTrip = await db.Trip.findByIdAndUpdate(req.params.id, req.body, {new: true});
    
        return res.redirect(`/trip/${updatedTrip._id}`);
    
    } catch (err) {
        return res.send(`${err}, error`);
    }; 
});

//delete
router.delete("/:id", async (req, res) => {
   
    try {
        await db.Trip.findByIdAndDelete(req.params.id);
        return res.redirect("/trip");
    } catch (err) {
        return res.send(err);
    }

});

//export router
module.exports = router;