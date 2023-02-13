const mongoose=require("mongoose")

const UserSchema=new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    mobile:{
        type:String
    },
    otp:{
        type:String,
        default:""
    }
})

const User=new mongoose.model("User",UserSchema)
module.exports=User