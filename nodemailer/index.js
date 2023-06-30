import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

export const sendToUser = async (email, password, domen) => {
   try {
      dotenv.config();

      const transporter = nodemailer.createTransport({
         host: 'smtp.mail.ru',
         port: 465,
         secure: true,
         auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
         }
      });

      let result = await transporter.sendMail({
         from: `LEAD-OFF <${process.env.EMAIL}>`,
         to: email,
         subject: 'Регистрация',
         text: `Ваш логин - ${email} и пароль - ${password}`,
         //html: htmlWithID
      });

      console.log(result);
   } catch (err) {
      return console.log(err);
   }
}
