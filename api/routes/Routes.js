const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');

const DataModel = require('../models/DataModel');



const files = [];

router.get('/', (req, res) => {

    DataModel.find({ })
        .then((data) => {
            // res.json(data);
            files = data;
            console.log(files);
        })
        .catch((error)=> {
            console.log("errors: ", error);
        });
});

router.post('/data', (req,res) => {
    // console.log("Body: ", req.body);
    const data = req.body;

    const newData = new DataModel(data);
    
    newData.save((error) => {
        if(error) {
            res.status(500).json({ msg: 'INTERNAL SERVER ERROR!' });
            return;
        }

        return res.json({
            msg: 'RECIEVED DATA'
        });
    })  
});

module.exports = router;