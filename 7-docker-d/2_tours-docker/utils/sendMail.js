import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config()

const sendMail = async ({email,subject,text,html}) => {


    // mail servis sağlayıcısını ayarla
    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });



    // mail içeriğini belirle

    const mailOptions = {
        // gönderen kullanıcının adresi
        from: "'Furkan Ercan' <info@mongotours.com>",

        // gönderilecek kullanıcının adresi
        to: email,

        // konu
        subject,

        // düz yazı
        text,

        //html gövdesi
        html
    }

    // oluşturduğum ayarlara sahip maili gönder
    await transporter.sendMail(mailOptions)
}

export default sendMail;