const mongoose = require ("mongoose")

const userRegSchema = new mongoose.Schema({
    username: String,
    email:String,
    password: String,
    profilePic:{
        type:String,
        default: "noProfilrPic.jpg"
    },
    token:String
})

const userRegModel = new mongoose.model("userreg",userRegSchema)

module.exports = userRegModel