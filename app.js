const { static } = require('express');
const express = require('express');
const app = express();
const body_parser = require('body-parser');
//Routes
const main_route = require('./routes/main');
const student = require('./models/student.js');
const students_route = require('./routes/students');
//config
const dotenv = require('dotenv');
const connect_db = require('./config/db');

dotenv.config({ path: './config/config.env' });
connect_db();

app.use(body_parser.urlencoded({ extended : true }));
app.set("view engine","ejs");
app.use(express.static('public'));

//using routes
app.use('/',main_route);
app.use('/students',students_route);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server online in ${process.env.NODE_ENV} mode on port ${PORT}`));