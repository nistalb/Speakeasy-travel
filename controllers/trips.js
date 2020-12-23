//require express
const express = require("express");

const router = express.Router();

const db = require("../models");

/* Create routes */

//index
router.get("/", async (req, res) => {
    
    try {
        const allTrips = await db.Trip.find({createdBy: req.session.currentUser.id});

        const context = {trip: allTrips};
        
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
                
        //push trip into traveler
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
        dateStart = new Date(foundTrip.dateStart).toISOString().split('T')[0];
        dateEnd = new Date(foundTrip.dateEnd).toISOString().split('T')[0];
        
        const context = { trip: foundTrip, dateStart, dateEnd };
        
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
        
        const foundTrip = await db.Trip.findByIdAndDelete(req.params.id);
        console.log("I have found trip")
        console.log(foundTrip)
        //delete the trip from the traveler data
        const foundTraveler = await db.Traveler.find( {createdBy: req.session.currentUser.id});
        console.log(foundTraveler)
        foundTraveler[0].trips.remove(foundTrip);
        foundTraveler[0].save();

        return res.redirect("/trip");
    } catch (err) {
        return res.send(err);
    }

});

//export router
module.exports = router;