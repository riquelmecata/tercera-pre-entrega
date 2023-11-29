import nodemailer from "nodemailer"
import env from "../config/config.js";

export const transport= nodemailer.createTransport({
    service:'gmail',
    port:587,
    auth:{
        user:'riquelmecata@gmail.com',
        pass:'lpch exyw jsby bfra'
    }
})


export const emailSender = async (mailTo, subjectStr, htmlFunc) => {

    try {
        await transport.sendMail({
            from: `"Prueba" <riquelmecata@gmail.com>`, // sender address
            to: mailTo, // list of receivers
            subject: subjectStr, // Subject line
            html: htmlFunc, // html body
            dsn: {
                id: 'some random message specific id',
                return: 'headers',
                notify: ['failure', 'delay'],
                recipient: `riquelmecata@gmail.com`
            }
        });

        return { success: true }

    } catch (error) {
        console.log(error)
        return { err: "Can not send the email" }
    }



}

transport.verify().then(() => console.log("ready for send email"))