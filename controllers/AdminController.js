import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

import UserModel from '../models/User.js';
import AdminModel from '../models/Admin.js';


export const login = async (req, res) => {
   /*
      #swagger.tags = ["Admin"]
      #swagger.summary = 'Вход в админку'
   */   
   try {
      const admin = await AdminModel.findOne({ login: req.body.login });

      if (!admin) {
         return res.status(400).json({
            message: 'invalid username or password'
         });
      }

      const isValidPass = await bcrypt.compare(req.body.password, admin._doc.passwordHash);

      if (!isValidPass) {
         return res.status(400).json({
            message: 'invalid username or password'
         });
      }

      const token = jwt.sign(
         {
            _id: admin._id,
         },
         'leads',
         {
            expiresIn: '30d',
         }
      );

      const { passwordHash, ...userData } = admin._doc;

      res.json({
         ...userData,
         token
      })

   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: "failed to log in"
      });
   }
};

export const getUserByID = async(req,res) => {
   /*
      #swagger.tags = ["Admin"]
      #swagger.summary = 'Получить пользователя по ид, если ид=="", то всех'
   */   
   try{
      let user;
      const userId = req.params.id;
      if(!userId){
         user = await UserModel.find().exec().catch((err)=>{
            res.status(404).json({
               message: 'Пользователи не найдены'
            })
         });
      }else{
         user = await UserModel.findById(userId).catch((err)=>{
            res.status(404).json({
               message: 'Пользователь не найден'
            })
         });
      }

      //const { passwordHash, ...userData } = user?._doc;
      res.json(user);
   }catch(err){
      console.log(err);
      res.status(500).json({
         message: "Нет доступа"
      });
   }
};

export const resentPassword = async (req, res) => {
   /*
      #swagger.tags = ["Admin"]
      #swagger.summary = 'Восстановление пароля'
   */
   try {
      const email = req.body.email;
      const doc = await UserModel.findOne({ "email": email });

      if(!doc){
         return res.status(501).json({
            message: 'email is not find'
         });
      }

      //send email{
      try{
         dotenv.config({ path: './nodemailer/.env' });
         const transporter = nodemailer.createTransport({
            host: 'smtp.mail.ru',
            port: 465,
            secure: true,
            auth: {
               user: 'kuancarlos@mail.ru',
               pass: 'crAxVSVTC3Kyktx6SVgA'
            }
         });
 
         const domen = req.get('host');
         let htmlWithID = process.env.RESENTPASSLETTER.replaceAll('#domen#',domen);
         htmlWithID = htmlWithID.replaceAll('userID',doc._id);
         let result = await transporter.sendMail({
            from: `"I am copyrighter!" <kuancarlos@mail.ru>`,
            to: email,
            subject: 'Восстановление пароля',
            html: htmlWithID
         });
      }catch(err){
         console.log(err);
         return res.status(505).json({
            message: "Не удалось отправить сообщение"
         })
      }
      //}send email

      const { passwordHash, ...userData } = doc._doc;

      res.json({
         ...userData
      });
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: "Не удалось восстановить пароль"
      })
   }
};