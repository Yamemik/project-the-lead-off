import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

export const sendToUser = async (req, res) => {
    try {
       try{
          dotenv.config({ path: './nodemailer/.env' });
          const transporter = nodemailer.createTransport({
             host: 'smtp.mail.ru',
             port: 465,
             secure: true,
             auth: {
                user: env.USER,
                pass: env.PASS
             }
          });
          
          const domen = req.get('host');
          let htmlWithID = process.env.LETTER.replaceAll('#domen#',domen);
          htmlWithID = htmlWithID.replaceAll('userID',doc._id);//
          let result = await transporter.sendMail({
             from: `"LEADS" <${env.USER}>`,
             to: doc.email,
             subject: 'Регистрация',
             html: htmlWithID
          });
       }catch(err){
          return res.status(500).json({
             message: "Не удалось отправить сообщение"
          });
       }
    } catch (err) {
       console.log(err);
       res.status(500).json({
          message: "Не удалось зарегистрироваться"
       })
    }
 };
 