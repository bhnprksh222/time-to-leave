const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const axios = require('axios');
require('dotenv').config();
const nodemailer = require('nodemailer');

const Data = require('./models/DataModel');
const routes = require('./routes/Routes');

const app = express();
const PORT = process.env.PORT || 8080;

mongoose.connect('mongodb+srv://admin:admin@cluster0.vxx0y.mongodb.net/data?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS
    }
});   
  


  
// transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//         console.log(error);
//     } else {
//         console.log('Email sent: ' + info.response);
//     }
// });

app.use(morgan('combined'))
app.use('/', (req, res) => {
    Data.find({ })
        .then((data) => {
            data.map((el) => {
                information.push({name: el.name, mail: el.email, msg: el.msg})
                console.log(information)
            })
        })
        .catch((error)=> {
            console.log("errors: ", error);
        });

});

let information = [];

information.map((el) => {
    let mailOptions = {
        from: process.env.EMAIL,
        to: el.mail,
        subject: 'TIME TO LEAVE',
        text: el.msg 
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    
})

app.use('/api', routes);

// const dat = axios('http://localhost:8080/') 
//     .then((res) => console.log(JSON.stringify(res)))
//     .catch(error => console.log(error));


var server = app.listen(PORT, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});