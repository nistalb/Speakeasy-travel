// require mongoose
const mongoose = require("mongoose");

// connnection string
const dbUrl = "mongodb://localhost:27017/speakeasydb"

// connect
mongoose.connect(dbUrl, {
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

};