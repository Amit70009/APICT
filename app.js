const { urlencoded } = require('express');
const dotenv = require('dotenv');
dotenv.config();
var express = require('express');
var CommonFunction = require("./CFunction/commonfunction");
var app = express();
const axios = require('axios');
var Constant = require("./Constant/constant");
var path = require('path');
var dbconn = require("./db/dbconnect");
var RegisterUserRouter = require("./Register/Routes");
var RegisterRolesRouter = require("./Register/Routes");
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));
dbconn.databaseConn();

app.get("/", (request, response) => {
    response.sendFile(__dirname); 
});

app.use("/api/users", RegisterUserRouter);
app.use("/api/users", RegisterRolesRouter);

app.listen(Constant.portNo, async (error, conn) => {
    if(error){
        console.log("error", error);
        throw error
    }
    console.log(`Server has been started on port no : ${Constant.portNo}`);
});