const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const isLoggedIn = require('../utilites/isLoggedln');

// rendering signup page
router.get('/signup', (req,res) => {
    res.render('signup');
});
// creating new USER and checking 18 or under if under 18 not signup to app
router.post('/signup', async (req, res) => {
    try{
        if (req.body.age >= 18) {
        const newUser = await User.register(new User({
        email: req.body.email,  
        username: req.body.username,  
        age: req.body.age,
       }), req.body.password);
       }else{
           res.redirect('/signup');
       }if (req.body.age >= 18) {
        passport.authenticate('local')(req, res, () => {
            res.redirect('/');
           });
       }
    }catch(err){
        console.log(err);
        res.send(err);
    }
 });
 
//login-page
router.get("/login", (req,res) => {
    res.render('login');
});
//authenticate 
router.post("/login", passport.authenticate('local', {
    successRedirect: '/students',
    failureRedirect: '/login',
    successFlash: `Logged in successFully ! Welcome to app !`,
    failureFlash: `Giriş Başarısız! Bir kez daha deneyiniz`,
})); 
// log-out
router.get("/logout",isLoggedIn,(req,res) => {
    req.logOut();
    req.flash("success", `Logged Out! Goodßye !`);
    res.redirect('/');
});

module.exports = router;