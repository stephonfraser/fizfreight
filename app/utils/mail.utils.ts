import nodemailer from "nodemailer";
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
