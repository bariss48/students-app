const express = require('express');
const router = express.Router();
const multer = require('multer');
const { patch } = require('./main');
const student = require('../models/student');
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

router.get('/', async (req,res) =>{
  res.render('profile');
})

router.post('/', upload.single('avatar'), async (req, res) => {
   
    console.log(req.file);
    const newPhoto = {
     avatar: req.body.avatar,
  }
    try {
      const avatar = await student.create(newPhoto);
      res.redirect('/students',{avatar});
    } catch (err) {
        res.redirect("/");
    }
    

    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
  })

  module.exports = router;