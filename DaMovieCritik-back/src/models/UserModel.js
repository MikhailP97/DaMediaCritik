const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        birthday: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            default: "USER"
        },
    }
)
const UserModel = mongoose.model("users", UserSchema)
module.exports ={UserModel}