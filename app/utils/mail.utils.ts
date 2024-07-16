import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
let user = "stephonfraserofficial@gmail.com";
let pwd = "szzczsfokmmbrhej";

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: user,
        pass: pwd
    }
})


export const mailOptions = {
    from: user,
}
