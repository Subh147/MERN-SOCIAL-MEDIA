const mongoose = require("mongoose")

const likeSchema =new mongoose.Schema({
    userlike:{
        type:String,
    },
    postId:{
        type:String,
    }
})

const likemodel = new mongoose.model("like",likeSchema)

module.exports = likemodel