//require express
const express = require("express");
const { db } = require("../models/Trip");

const router = express.Router();

//require the data
//const db = require("../models");

/* Create routes */

//new
router.get("/new", (req, res) => {
    res.render("pictures/new");
});

//create
router.post("/new", async (req, res) => {
    try {
        req.body.createdBy = req.session.currentUser.id
        await db.Picture.create(req.body);
        return res.redirect("/travelers");

    } catch(err){
        return res.send(err);
    }
    
});

//show
router.get("/:id", async (req, res) => {
    try {
        const foundPic = await db.Picture.findById(req.params.id);

        const context = {picture: foundPic};
        return res.render("pictures/show", context);

    
    } catch(err) {
        return res.send(err);
    }
});

//edit
router.get("/:id/edit", (req, res) =>{

});

//update
router.put("/:id", (req, res) => {

});

//delete
router.delete("/:id", async (req, res) => {
    try {
        const deletedPicture = await db.Picture.findByIdAndDelete(req.params.id);
        await db.Picture.remove({picture: deletedPicture._id});
        return res.redirect("/pictures")

    } catch (err) {
        return res.send(err);
    }

});

//export router
module.exports = router;