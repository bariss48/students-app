const express = require('express');
const router = express.Router();
const student = require('../models/student');
const multer = require('multer');
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

router.post('/',upload.single('avatar'), async (req,res) => {
    const newStudent = {
        name: req.body.name,
        surname: req.body.surname,
        university: req.body.university,
        department: req.body.department,
        no:req.body.no,
        age: req.body.age,
        city: req.body.city,
        gender: req.body.gender,
        grade: req.body.grade,
        avatar: req.file.filename,
  }
    try {
      const students = await student.create(newStudent);
      res.redirect("/students/" + students._id);
    } catch (err) {
        res.redirect("/");
    }
});

router.get('/new', async (req,res) => {
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