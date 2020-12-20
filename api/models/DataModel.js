const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const DataSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    source : {
        type: String,
        required: true
    }, 
    destination : {
        type: String,
        required: true
    },
    t : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    clickedTime : {
        type: String,
        required: true
    },
    msg : {
        type: String
    }
});

const Data = mongoose.model('Data', DataSchema, 'info');

module.exports = Data;