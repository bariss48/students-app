const mongoose = require('mongoose');

const student_schema = new mongoose.Schema ({
    id:mongoose.Schema.Types.ObjectId,
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