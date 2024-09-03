
const cors = require("cors");
const express = require('express');
const path = require('path');
require('dotenv').config();
const { PORT} = process.env;

const cookieParser = require('cookie-parser');
const { router } = require("./routes/reg.router");


const authMiddleware = require('./authMiddleware');

const app = express();

// body parser - req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// cors
app.use(cors());


app.use(express.static('public'));

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(process.env.PORT || PORT, () => {
    console.log(`run on ${process.env.PORT || PORT}`);
});


/**
 *  server
 *    |_ config - connection to databases
 *    |_ models - queries to database/files
 *    |_ controllers - function implements code - request, response
 *    |_ routes - route for api
 */


app.use("/", router);
