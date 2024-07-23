import nodemailer from "nodemailer";
let user = "support@fizuro.com";
let pwd = "CareSupport000";

export const transporter = nodemailer.createTransport({
    pool: true,
    host: "mail.privatemail.com",
    port: 465,
    secure: false, // use TLS
    auth: {
        user: user,
        pass: pwd,
    },
})




export const mailOptions = {
    from: user,
}
