const { ObjectID } = require("bson");

var UserSchema = require("../Register/Models").usermodel;
var CommonFunc = require("../CFunction/commonfunction");

/* For Login */
async function userLogin(data){
    try {
        var matchUser = await UserSchema.findOne({
           email: data.email
        },{createdOn: 0, __v: 0})
        if(matchUser){
    
        let decryptPass = await CommonFunc.decryptPassword(data.password, matchUser.password);
        if(decryptPass == false){
            return {
                status: 202,
                message: "Password is Incorrect, or unmatched",
                data: {}
            }
        }

        let genToken = CommonFunc.generateToken({id: matchUser._id});
        await UserSchema.updateOne({_id: ObjectID(matchUser._id)}, {
            $set: {
                acc_token: genToken
            }
        });
        return {
            status: 200,
            message: "Login successfully",
            data: {
                userId: matchUser._id,
                name: matchUser.name,
                email: matchUser.email,
                acc_token: genToken
            }
        }
    }
    return {
        status: 404,
        message: "User not found, Either Email or password is incorrect",
        data: {matchUser}
    }
} catch (error) {
    console.log(error);
    throw error
}
}
module.exports = { userLogin }
