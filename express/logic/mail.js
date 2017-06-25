'use strict';
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'paolospadoni1980@gmail.com',
        pass: 'kersey11'
    }
});


exports.sendMail = (errorCode, machine, date ) => {
    return new Promise((resolve, reject) => {
        /*let transporter = mail.configureTransporter();*/

        let mailOptions = {
            from: 'paolospadoni1980@gmail.com', // sender address
            to: 'paolospadoni1980@gmail.com', // paolospadoni1980@gmail.com //'michele.romanin.jacur@n-ice.it', // list of receivers
            subject: "N-ICE " + machine + "-" + errorCode + " date:" + date, // Subject line
            text: "ERROR", // plain text body
            html: "<b>The machine </b>" + machine + "<b> has thrown an error with code </b>" + errorCode // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                transporter.close();
                reject(Error(error))
            }
            
            console.log('Message %s sent: %s', info);
            resolve(info);

        });
    })


}