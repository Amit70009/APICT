var express = require("express");
var userRouter = express.Router();
var UserController = require("../Login/Controller");
var mongoose = require("mongoose");

userRouter.post("/update", async (req, res) => {
    const allParams = req.body;
    var callUpdateMethod = await UserController.UpdateProfile(allParams);
    res.send({
        status: callUpdateMethod.status,
        message: callUpdateMethod.message,
        data: callUpdateMethod.data
    })
})

module.exports = userRouter