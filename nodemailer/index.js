import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

export const sendToUser = async (id, email, password, domen) => {
   try{
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
      //let htmlWithID = process.env.LETTER.replaceAll('#domen#',domen);
      //htmlWithID = htmlWithID.replaceAll('userID',id);
      const reference = domen + '/user/auth/login?' + id;
      let result = await transporter.sendMail({
         from: `LEADS <${process.env.EMAIL}>`,
         to: email,
         subject: 'Регистрация',
         text: `Ваш логин - ${email} и пароль - ${password} ссылка - ${reference}`,
         //html: htmlWithID
      });
      console.log(result);
   }catch(err){
      return console.log(err);     
   }   
}