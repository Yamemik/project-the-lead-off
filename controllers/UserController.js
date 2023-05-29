import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import generatePassword from 'password-generator';

import UserModel from '../models/User.js';

export const createUser = async (req, res) => {
   /*
      #swagger.tags = ["Admin"]
      #swagger.summary = 'Регистрация пользователя'
   */
      const password = generatePassword(12, false);
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

   try{
      const doc = new UserModel({
         fio: req.body.fio,
         email: req.body.email,
         telephone: req.body.telephone,
         organization: req.body.organization,
         country: req.body.country,
         city: req.body.city,
         business_line: req.body.business_line,
         access_to_open: req.body.access_to_open,
         balance: req.body.balance,
         passwordHash: hash
      });

      const user = await doc.save();

      //

      const { passwordHash, ...userData } = user._doc;

      res.json({
         ...userData
      });
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: "Failed to register"
      })
   }
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