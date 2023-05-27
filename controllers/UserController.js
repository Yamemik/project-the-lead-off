import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';


import UserModel from '../models/User.js';

export const pre_register = async (req, res) => {
   /*
      #swagger.tags = ["Auth"]
      #swagger.summary = 'Пред регистрация аккаунта'
   */
   try {
      const doc = new UserModel({
         email: req.body.email,
         rate: req.body.rate
      });

      const user = await doc.save();

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
         let htmlWithID = process.env.LETTER.replaceAll('#domen#',domen);
         htmlWithID = htmlWithID.replaceAll('userID',doc._id);//
         let result = await transporter.sendMail({
            from: `"I am copyrighter!" <kuancarlos@mail.ru>`,
            to: doc.email,
            subject: 'Регистрация на курс по копирайтингу',
            html: htmlWithID
         });
      }catch(err){
         await UserModel.findByIdAndDelete(doc._id)
            .then(()=>{console.log("user delete")})
            .catch((err)=>{console.log(err)});
         console.log(err);
         return res.status(500).json({
            message: "Не удалось отправить сообщение"
         });
      }
      //}send email

      const { passwordHash,family,name, ...userData } = user._doc;

      res.json({
         ...userData
      });
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: "Не удалось зарегистрироваться"
      })
   }
};

export const register = async (req, res) => {
   /*
      #swagger.tags = ["Auth"]
      #swagger.summary = 'Регистрация аккаунта'
   */
   //hash password
   const password = req.body.password;
   const salt = await bcrypt.genSalt(10);
   const hash = await bcrypt.hash(password, salt);

   const userId = req.params.userId;
   const doc = await UserModel.findById(userId);
   const docRole = await RoleModel.findById("64662b00579e543b8b05632e");

   if(!doc){
      return res.status(404).json({
         message: "Пользователь не зарегистрирован"
      });
   }

   UserModel.updateOne({
      _id: userId
   },{
      family: req.body.family,
      name: req.body.name,
      passwordHash: hash,
      role: docRole
   },{
      returnDocument: 'after'
   }).then(async()=>{
      const token = jwt.sign(
         {
            _id: userId,
         },
         'key123',
         {
            expiresIn: '30d',
         }
      );

      const doc = await UserModel.findById(userId);
      const { passwordHash, ...userData } = doc._doc;

      res.json({
         ...userData,
         token
      }); 
   }).catch((err)=>{
      console.log(err);
      res.status(500).json({
         message: "Не удалось создать пользователя"
      })
   });
};

export const login = async (req, res) => {
   /*
      #swagger.tags = ["Auth"]
      #swagger.summary = 'Вход в аккаунт'
   */   
   try {
      const user = await UserModel.findOne({ email: req.body.email });

      if (!user) {
         return res.status(403).json({
            message: 'Неверный логин или пароль.'
         });
      }

      const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

      if (!isValidPass) {
         return res.status(403).json({
            message: 'Неверный логин или пароль.'
         });
      }

      const token = jwt.sign(
         {
            _id: user._id,
         },
         'key123',
         {
            expiresIn: '30d',
         }
      );

      const { passwordHash, ...userData } = user._doc;

      res.json({
         ...userData,
         token
      })

   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: "Не удалось авторизоваться"
      });
   }
};

export const getMe = async(req,res) => {
   /*
      #swagger.tags = ["User"]
      #swagger.summary = 'Личный кабинет'
   */   
  try{
      const user = await UserModel.findById(req.userId).catch((err)=>{
         res.status(404).json({
            message: 'Пользователь не найден'
         })
      });
   
      const { passwordHash, ...userData } = user._doc;
      res.json(userData);
   }catch(err){
      console.log(err);
      res.status(500).json({
         message: "Нет доступа"
      });
   }
};

export const getUserByID = async(req,res) => {
   /*
      #swagger.tags = ["User"]
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
      #swagger.tags = ["Auth"]
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