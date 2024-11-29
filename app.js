const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();



app.use(cors()); //used to accept from particular domain

app.get('/',(req,res) => {
    res.send("Hello world");
});

module.exports = app;