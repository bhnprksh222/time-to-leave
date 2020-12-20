const express = require("express");
const router = express.Router();

const DataModel = require('../models/DataModel');


router.get('/', (req, res) => {

    DataModel.find({ })
        .then((data) => {
            // console.log('Data: ', data);
            res.json(data);
        })
        .catch((error)=> {
            console.log("errors: ", error);
        });

    // newData.save((err, data) =>{
    //     if(err) {
    //         res.status(500).json({ msg: 'Sorry, internal server error' });
    //     } else {
    //         return res.status(200).json({ status: 1, result: data });
    //     }
    // });
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