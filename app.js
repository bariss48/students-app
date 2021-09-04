const { static } = require('express');
const express = require('express');
const app = express();
const body_parser = require('body-parser');
//Routes
const main_route = require('./routes/main');
const student = require('./models/student.js');
const students_route = require('./routes/students');
const multer_route = require('./routes/multer');
const auth_route = require('./routes/auth');
//config
const dotenv = require('dotenv');
const connect_db = require('./config/db');
//authanticate
const User = require('./models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');

dotenv.config({ path: './config/config.env' });
connect_db();

app.use(expressSession({
    secret: "sadasfaslhfalsjfjlasfjlowqjfloaqogğkqagilpassaşfliawktşpkageksgnajkgadlgnbadjtwrqodsalkfalksjf",
    resave: false,
    saveUninitialized: false
    // using store session on MongoDB using express-session + connect
}));

app.use(body_parser.urlencoded({ extended : true }));
app.set("view engine","ejs");
app.use(express.static('public'));

app.use(passport.initialize());
app.use(passport.session());
app.use(body_parser.urlencoded({ extended : true }));
app.use(cookieParser());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

//using routes
app.use('/',main_route);
app.use('/students',students_route);
app.use('/profile',multer_route);
app.use('/',auth_route);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server online in ${process.env.NODE_ENV} mode on port ${PORT}`));