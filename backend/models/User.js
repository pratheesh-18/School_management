const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },

    role:{
        type:String,
        enum:["SuperAdmin","SchoolAdmin","Teacher","Student"],
        default:"Student"
    },

    schoolId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"School",
        default:null
    }

});

module.exports = mongoose.model("User",userSchema);