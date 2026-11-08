const nodemailer = require('nodemailer');

async function SendMail(){

    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'Hassanjabbar2017@gmail.com',
            pass:'poljeaszpdjiywtk'
        }
    })

   const mailOption = {
         from:'Hassanjabbar2017@gmail.com',
         to:'saeedullah53493@gmail.com',
         subject:'Welcome to node js',
         text:'This is send from nodemail (Test message)',
   }

   try{
    const result =  await transporter.sendMail(mailOption);
    console.log("Message has been sent");
   }
   catch(err){console.log("error is: ",err)}

}

SendMail();
