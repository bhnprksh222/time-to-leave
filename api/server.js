const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const axios = require('axios');

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

app.use(morgan('tiny'))
app.use('/', routes);
app.use('/api', routes);

// const dat = axios('http://localhost:8080/') 
//     .then((res) => console.log(JSON.stringify(res)))
//     .catch(error => console.log(error));

var server = app.listen(PORT, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});