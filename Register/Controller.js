const { ObjectID } = require("bson");

var UserSchema = require("../Register/Models").usermodel;
var CommonFunc = require("../CFunction/commonfunction");

/* For Register */
async function userRegister(data){
    try {
        var checkUserData = await UserSchema.find({
            $or: [{email: data.email}, {mobile: data.mobile}]
        });
        if(checkUserData.length){
            return {
                status: 201,
                message: "User already registered with this email or mobile",
                data: {}
            }
        }
        let encryptPass = await CommonFunc.encryptPassword(data.password);
        var regObj = {
            first_name: data.first_name,
            last_name: data.last_name,
            emp_id: data.emp_id,
            email: data.email,
            role: data.role,
            mobile: data.mobile,
            password: encryptPass,
            createdOn: new Date()
        }

        await UserSchema.create(regObj);

        // Send email to that user email :

        return {
            status: 200,
            message: "Registration successfully",
            data: {}
        }
    } catch (error) {
        console.log(error);
        throw error
    }
};

module.exports = { userRegister }
