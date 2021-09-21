const express = require('express');
const router = express.Router();
const student = require('../models/student');
const multer = require('multer');
const isLoggedIn = require('../utilites/isLoggedln');
const fileStorageEngine = multer.diskStorage ({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: function (req, file , callback) {
        callback(null, Date.now() + "-" + file.originalname);
    }
   });    

const upload = multer({storage: fileStorageEngine});

router.use(express.static('uploads'));

router.get("/", async (req,res) => {    
    const students = await student.find().exec();
    res.render("students",{students});
})

router.post('/',isLoggedIn, upload.single('avatar'), async (req,res) => {
    const name = req.body.name.toUpperCase();
    const surname = req.body.surname.toUpperCase();
    const city = req.body.city.toUpperCase();
    const department = req.body.department.toUpperCase();
    const grade = req.body.grade.toUpperCase();
    const gender = req.body.gender.toUpperCase();
    const newStudent = {
        name,
        surname,
        university: req.body.university,
        department,
        gender,
        grade,
        city,
        description: req.body.description,
        instagram: req.body.instagram,
        twitter: req.body.twitter,
        linkedin: req.body.linkedin,
        no:req.body.no,
        age: req.body.age,
        email: req.body.email,
        avatar: req.file.filename,
  }
    try {
      const students = await student.create(newStudent);
      res.redirect("/students/" + students._id);
      req.flash("success","Your Profile Created!")
    } catch (err) {
        req.flash("error", "Error cant created profile!")
        res.redirect("/");
    }
});

router.get('/new',isLoggedIn, async (req,res) => {
    res.render('new_student');
})

router.get("/:id", async (req,res) => {
    try {
       const students = await student.findById(req.params.id).exec();
       res.render("students_show",{students})
    } catch (err) {
        console.log(err);
        res.send("hata!");
    }
    })

module.exports = router;