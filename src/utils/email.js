
import nodemailer from "nodemailer";

const SendEmail= async({ from=process.env.EMAIL,to,cc,bcc,subject,text,html,attachments=[] } ={})=>{
    const transporter = nodemailer.createTransport({
        service:"gmail",
          auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
          }
        });
          // send mail with defined transport object
          const info = await transporter.sendMail({
            from: `"Trello " <${from}>`, // sender address
            to, // list of receivers
            cc,
            bcc,
            subject, // Subject line
            text, // plain text body
            html, // html body
            attachments
          });
        // console.log(info);
}

export default SendEmail