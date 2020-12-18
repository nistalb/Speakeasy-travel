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
    res.send("on the login page")
});

//verify login information
router.post("/login", (req, res) => {

})

//delete
router.delete("/logout", (req, res) => {

});


//export router
module.exports = router;