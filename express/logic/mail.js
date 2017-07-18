'use strict';
const nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
   /* service: 'gmail',
    auth: {
        user: 'paolospadoni1980@gmail.com',
        pass: 'kersey11',
        debug: true,
        type: 'oauth2',
        clientId: "983953215141-2a2hljh6jch8b8b450j6m609lunfurs1.apps.googleusercontent.com",
        clientSecret: "pyql-PydQKBL5MYTivNQ4a9N",
        refreshToken:'1/MdHshhXnhnrw6Bel1a0lpPibyFXy22Q8EH8vQGZuH77fOi5rRHMsA5jF1XgDlddO'
        
    }*/
    service: 'Yahoo',
      auth: {
          user: 'paolo_spadoni',
          pass: 'kersey128D1',
      }
    /*service: 'Gmail',
    auth: {
        user: 'paolospadoni19801@gmail.com',
        pass: 'kersey11'
    }*/
});


/*var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // hostname
  port: 587, // secure:true for port 465, secure:false for port 587
  secure: false, // port for secure SMTP
  auth: {
    user: 'paolospadoni1980@gmail.com',
    pass: 'kersey11'
  }
});*/


exports.sendMail = (errorCode, machine, date ) => {
    return new Promise((resolve, reject) => {
        /*let transporter = mail.configureTransporter();*/
        var textMail ="ERROR"
        if(errorCode.indexOf('INCOME')!=-1){
            textMail = "INFO"
        }
        let mailOptions = {
            from: 'paolo_spadoni@yahoo.it', // sender address
            to: 'macchine@n-ice.it, paolo_spadoni@yahoo.it, michele.romanin.jacur@n-ice.it, ludovica.fante@n-ice.it', // paolospadoni1980@gmail.com //'michele.romanin.jacur@n-ice.it', // list of receivers
            //to: 'paolo_spadoni@yahoo.it', // paolospadoni1980@gmail.com //'michele.romanin.jacur@n-ice.it', // list of receivers
            subject: "N-ICE " + machine + "-" + errorCode + " date:" + date, // Subject line
            text: textMail, // plain text body
            html: "<b>The machine </b>" + machine + "<b> has thrown a code </b>" + errorCode // html body
        };

        /*transporter.verify(function(error, success) {
        if (error) {
                console.log('error mail is' + error);                    
        } else {
                console.log('Server is ready to take our messages');
                console.log('success mail is '+ success);     
        }
        });*/

       transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                transporter.close();
                reject(Error(error))
            }
            if(info.accepted){
                info.accepted.map(destination =>{
                     console.log('Message to %s sent', destination);
                })
            }
            transporter.close();
            resolve(info);

        });
    })


}