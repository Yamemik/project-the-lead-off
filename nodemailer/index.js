import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

export const sendToUser = async (id, email, password, domen) => {
   try{
      dotenv.config({ path: '../nodemailer/.env' });

      console.log(process.env.EMAIL)
      console.log(process.env.PASSWORD)
         
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
      let result = await transporter.sendMail({
         from: `LEADS <yamemik@mail.ru>`,
         to: 'kuancarlos@mail.ru',
         subject: 'Регистрация',
         //html: 
         text: 'dfgd'
      });
      console.log(result);
   }catch(err){
      return console.log(err);     
   }   
}

sendToUser('dfdfg','kuancarlos@mail.ru','12345','fff');