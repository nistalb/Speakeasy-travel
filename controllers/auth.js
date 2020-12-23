//require express
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');

//require the data
const db = require("../models");

/* Create routes */

//register
router.get("/register", (req, res) => {
    res.render("auth/register");
})

//POST registration
router.post("/register", async (req, res) => {
    
    try{

        const foundUser = await db.User.findOne( {email: req.body.email });

        if (foundUser) return res.redirect("/login");

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;
        const newUser = await db.User.create(req.body);

        
        return res.redirect("/login");

    } catch (err) {
        return res.send(err);
    };
});

//login
router.get("/login", (req, res) => {
    res.render("auth/login", {message: ""});
});

//verify login information
router.post("/login", async (req, res) => {

    try {
        const foundUser = await db.User.findOne({ email: req.body.email });

        if (!foundUser) return res.render("auth/login", {message: "Account not found.  Please register"});

        const match = await bcrypt.compare(req.body.password, foundUser.password);

        if (!match) return res.render("auth/login", {message: "Password or Email invalid."});

        //create user session
        req.session.currentUser = {
            id: foundUser._id,
            username: foundUser.username
        };

        //decide which page to login to
        const traveler = await db.Traveler.find( {createdBy: req.session.currentUser.id});
        
        if (!traveler.length) {
            return res.redirect("/traveler/new");
        } else{
            return res.redirect("/traveler");
        }
        
    } catch (err) {
        return res.send(err);
    };
})

//delete
router.delete("/logout", async (req, res) => {
    await req.session.destroy();
    res.redirect("/");
});


//export router
module.exports = router;