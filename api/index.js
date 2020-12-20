var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    config = require('./config'),
    cors = require("cors"),
    nodemailer = require('nodemailer');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/contact', (request, response) => {
    var text = `<p><b>${request.query.name}</b> has filled out the contact form on https://lorna.dev/contact. The details are:</p>
                <p><b>Email</b>: ${request.query.email}</p>
                <p><b>Message</b>: ${request.query.message}</p>`;


    var transporter = nodemailer.createTransport(`smtps://${config.fromEmail}:${config.password}@${config.host}`);

    const mailOptions = {
        from: `"${config.fromName}" <${config.fromEmail}>`,
        to: config.toEmail,
        subject: `Form Submitted from https://lorna.dev/contact`,
        html: text
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        response.status(200).send({
            message: "success"
        });
    });

});

var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});