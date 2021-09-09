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
});

student_schema.index({
    '$**': 'text'
});

module.exports = mongoose.model("student",student_schema);