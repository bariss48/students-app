const express = require('express');
const router = express.Router();
const student = require('../models/student');

router.get("/", async (req,res) => {    
    const students = await student.find().exec();
    res.render("students",{students});
})

router.post('/',async (req,res) => {
    const newStudent = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        university: req.body.university,
        department: req.body.department,
        no:req.body.no,
        category: req.body.category,
        gender: req.body.gender,
        image_link: req.body.image_link,
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