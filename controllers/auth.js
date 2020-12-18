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
    res.render("auth/login");
});

//verify login information
router.post("/login", async (req, res) => {

    try {
        const foundUser = await db.User.findOne({ email: req.body.email });

        if (!foundUser) return res.render("auth/login");

        const match = await bcrypt.compare(req.body.password, foundUser.password);

        if (!match) return res.render("auth/login");

        //create user session
        req.session.currentUser = {
            id: foundUser._id,
            username: foundUser.username
        };

        res.redirect("/traveler");

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