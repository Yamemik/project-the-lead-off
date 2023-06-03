import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import generatePassword from 'password-generator';

import UserModel from '../models/User.js';
import * as mailer from '../nodemailer/index.js';

export const createUser = async (req, res) => {
   /*
      #swagger.tags = ["Auth"]
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
         isAdmin: req.body.isAdmin,
         balance: req.body.balance,
         passwordHash: hash
      });

      const user = await doc.save();

      const domen = req.get('host');
      mailer.sendToUser(user._id,user.email,password,domen)
         .catch((err) => console.log('mail ERROR:', err));

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

export const log_in = async (req, res) => {
   /*
      #swagger.tags = ["Auth"]
      #swagger.summary = 'Вход в аккаунт'
   */   
   try {
      const user = await UserModel.findOne({ email: req.body.login });

      if (!user) {
         return res.status(403).json({
            message: 'invalid username or password'
         });
      }

      const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

      if (!isValidPass) {
         return res.status(403).json({
            message: 'invalid username or password'
         });
      }

      const token = jwt.sign(
         {
            _id: user._id,
         },
         'leads_user',
         {
            expiresIn: '7d',
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
         message: "failed to log in"
      });
   }
};

export const getMe = async(req,res) => {
   /*
      #swagger.tags = ["User"]
      #swagger.summary = 'Получить пользователя'
   */   
  try{
      const user = await UserModel.findById(req.userId).catch((err)=>{
         res.status(404).json({
            message: 'user not found'
         })
      });
   
      const { passwordHash, ...userData } = user._doc;
      res.json(userData);
   }catch(err){
      console.log(err);
      res.status(500).json({
         message: "no access"
      });
   }
};

export const getUserByID = async(req,res) => {
   /*
      #swagger.tags = ["Admin"]
      #swagger.summary = 'Получить одного пользователя по id или всех'
   */   
   try{
      const userId = req.params.id;

      const user = await UserModel.findById(userId).catch((err)=>{
         res.status(404).json({
            message: 'user not found'
         })
      });

      const { passwordHash, ...userData } = user._doc;
      res.json(userData);        
   }catch(err){
      console.log(err);
      res.status(500).json({
         message: "server error"
      });
   }
};

export const getUsers = async(req,res) => {
   /*
      #swagger.tags = ["Admin"]
      #swagger.summary = 'Получить всех пользователей'
   */   
   try{
      const users = await UserModel.find().exec().catch((err)=>{
         res.status(404).json({
            message: 'users not found'
         })
      });

      res.json(users);   
   }catch(err){
      console.log(err);
      res.status(500).json({
         message: "server error"
      });
   }
}

export const remove = async(req,res) => {
   /*
      #swagger.tags = ["Admin"]
      #swagger.summary = 'удалить пользователя'
   */   
   await UserModel.findByIdAndDelete(req.params.id)
   .then(()=> res.json({
      access: true
   })).catch((err)=>{
      console.log(err);
      res.status(404).json({
         message: "user not found or delete"
      });
   });
}

export const update = async(req,res) => {
   /*
      #swagger.tags = ["Admin"]
      #swagger.summary = 'изменить пользователя'
   */   
   await UserModel.updateOne({_id:req.params.id},{
      fio: req.body.fio,
      email: req.body.email,
      telephone: req.body.telephone,
      organization: req.body.organization,
      country: req.body.country,
      city: req.body.city,
      business_line: req.body.business_line,
      access_to_open: req.body.access_to_open,
      isAdmin: req.body.isAdmin,
      balance: req.body.balance,
   }).then(()=> res.json({
         access: true
   })).catch((err)=>{
         console.log(err);
         res.status(404).json({
            message: "user not found or update"
         });
   });
}




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