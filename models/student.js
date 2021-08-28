const mongoose = require('mongoose');

const student_schema = new mongoose.Schema ({
    
    id:mongoose.Schema.Types.ObjectId,
    name:String,
    surname: String,
    email: String,
    university: String,
    department: String,
    no:Number,
    category: String,
    gender: String,
    image_link: String,

});

student_schema.index({
    '$**': 'text'
});

module.exports = mongoose.model("student",student_schema);