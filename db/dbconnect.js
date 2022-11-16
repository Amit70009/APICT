var Constant = require("../Constant/constant");
var mongoose = require("mongoose");

// Connection code :

function databaseConn(){
    mongoose.connect(Constant.mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true}, (err, conn) => {

        if(err){
            console.log("errror", err);
            throw err
        }
        console.log("DB connected");
    })
}

module.exports = {
    databaseConn
};
