const functions = require('firebase-functions');
const admin = require("firebase-admin")
const nodemailer = require('nodemailer');

admin.initializeApp()


//google account credentials used to send email
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'dragonmasterassist@gmail.com',
        pass: 'bneapyzxuzauonmy'
    }
});


exports.sendEmail = functions.firestore
    .document('orders/{orderId}')
    .onCreate((snap, context) => {

        const mailOptions = {
            from: 'dragonmasterassist@gmail.com',
            to: snap.data().email,
            subject: 'contact form message',
            html: `<h1>Order Confirmation</h1>
                                <p>
                                   <b>Email: </b>${snap.data().email}<br>
                                </p>`
        };


        return transporter.sendMail(mailOptions, (error, data) => {
            if (error) {
                console.log(error)
                return
            }
            console.log("Sent!")
        });
    });

    exports.sendMailOverHTTP = functions.https.onRequest((req, res) => {
        const mailOptions = {
            from: 'dragonmasterassist@gmail.com',
            to: req.body.email,
            subject: 'contact form message',
            html: `<h1>Order Confirmation</h1>
                                <p>
                                   <b>Email: </b>${req.body.email}<br>
                                </p>`
        };
    
    
        return transporter.sendMail(mailOptions, (error, data) => {
            if (error) {
                return res.send(error.toString());
            }
            var data = JSON.stringify(data)
            return res.send(`Sent! ${data}`);
        });
    
    });
// const functions = require("firebase-functions");
// const nodemailer = require('nodemailer');
// // cors options, only for the testing purposes
// const corsOptions = {origin: true}
// // // Create and deploy your first functions
// // // https://firebase.google.com/docs/functions/get-started
// //
// // exports.helloWorld = functions.https.onRequest((request, response) => {
// //   functions.logger.info("Hello logs!", {structuredData: true});
// //   response.send("Hello from Firebase!");
// // });
// // functions/index.js

// const functions = require('firebase-functions');
// const express = require('express');

// const nodemailer = require('nodemailer');
// const app = express();
// const cors = require('cors');

// // change to your domain/s
// const whitelist = ['https://yourDomain.com', 'yourDomain.com'] 
// // const corsOptions = {
// //     origin: function (origin, callback) {
// //         if (whitelist.indexOf(origin) !== -1) {
// //             // eslint-disable-next-line callback-return
// //             callback(null, true)
// //         } else {
// //             // eslint-disable-next-line callback-return
// //             callback(new Error('Not allowed by CORS'))
// //         }
// //     }
// // }

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: functions.config().nodemailer.email,
//         pass: functions.config().nodemailer.password
//     }
// });
// app.get('/', cors(corsOptions), function (request, response, next) {
//     const from = 'dragonmasterassist@gmail.com' // Change to your verified sender
//     const {to, subject, text} = request.query
//     const msg = {
//         to:'sandeep.kolte@gmail.com',
//         from:'dragonmasterassist@gmail.com',
//         subject:'testsubject',
//         text:'testbody',
//         html: `<strong>${text}</strong>`,
//     }
//     transporter
//         .sendMail(msg)
//         // eslint-disable-next-line promise/always-return
//         .then(() => {
//             response.status(200).send('Email sent');
//         })
//         .catch((error) => {
//             response.status(200).send(error);
//         })
// })

// exports.email = functions.https.onRequest(app);