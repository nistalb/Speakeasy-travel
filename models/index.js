// require mongoose
const mongoose = require("mongoose");

// connnection string
const MONGODB_URI = "mongodb+srv://SEI:SEI1234@sei.woeti.mongodb.net/SEI?retryWrites=true&w=majority"

// connect
mongoose.connect(process.env.MONGODB_URI, {
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