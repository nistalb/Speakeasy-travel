/* == External Modules == */
const express = require("express");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

/* == Internal Modules == */
const controllers = require("./controllers");

/* == Instanced Modules == */
const app = express();
require("dotenv").config();  //gives access to .env file

/* == Configuration == */
const PORT = process.env.PORT;

app.set("view engine", "ejs"); // allows for leaving off the extension and makes the server more efficient

/* == Middleware == */

// server public as static files
//express.static(directory, location, absolute);
//app.use(express.static(_dirname + "/public"));

// body data middleware
app.use(express.urlencoded({extended: true}));

// method override middleware
app.use(methodOverride("_method"));

//session
app.use(
    session({
        //set the store to the MongoStore we required
        store: new MongoStore({
            url: process.env.MONGODB_URI || "mongodb://localhost:27017/speakeasydb"
        }),
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7 * 3
        }
    })
);

//logger
app.use(function(req,res,next){

    console.log(req.session);
    next();
});

// user authentication middleware
app.use(function(req,res,next){

    app.locals.user = req.session.currentUser;
    next();
});

const authRequired = require("./middleware/authRequired");

/* == Routes/Controllers == */

// Home Routes
app.get("/", function(req,res){
    // .render(file,context)
    res.render("home");
});

//auth controller
app.use("/", controllers.auth);

// traveler controller
app.use("/traveler", authRequired, controllers.traveler);

// trip controller
app.use("/trip", authRequired, controllers.trip);

//picture controller
app.use("/picture", controllers.picture)

/* == Server Listener == */
app.listen(PORT)