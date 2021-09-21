const mongoose = require('mongoose');

const student_schema = new mongoose.Schema ({
    name:String,
    surname: String,
    university: String,
    department: String,
    no:Number,
    city: String,
    gender: String,
    avatar: String,
    grade: String,
    age: Number,
    email : String,
    instagram: String,
    twitter: String,
    linkedin: String,
    description: String,
    owner:{
        id:{
           type: mongoose.Schema.Types.ObjectId,
           ref: "User" 
        },
        username: String
   },
});

student_schema.index({
    '$**': 'text'
});

module.exports = mongoose.model("student",student_schema);