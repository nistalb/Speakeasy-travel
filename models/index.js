// require mongoose
const mongoose = require("mongoose");

require("dotenv").config();

// connnection string
const dburl = process.env.MONGODB_URI || "mongodb://localhost:27017/speakeasydb"

// connect
mongoose.connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
.then(function(){
    console.log("Mongodb connected");
})
.catch(function(error){
    console.log("Mongodb error");
    console.log(error);
});

mongoose.connection.on("disconnected", function(){
    console.log("Mongodb disconnected");
});

module.exports = {
    Traveler: require("./Traveler"),
    User: require("./User"),
    Picture: require("./Picture"),
    Trip: require("./Trip")
};