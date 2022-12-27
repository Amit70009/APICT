const { MaxKey } = require("mongodb");
var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, require: true },
    emp_id: {type: String, required: true},
    mobile: { type: Number, MaxKey: 10, require: true},
    password: { type: String, require: true },
    role: {type:String, default:"student"},
    acc_token: {type: String},
    isUserActive: { type: Boolean },
    createdOn: {type: Date, default: new Date()}
});
var usermodel = mongoose.model("users", userSchema);

module.exports = {
    usermodel
}