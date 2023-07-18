import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import generatePassword from 'password-generator';

import UserModel from '../models/User.js';
import * as Mailer from '../nodemailer/index.js';

export const createUser = async (req, res) => {
   /*
      #swagger.tags = ["Auth"]
      #swagger.summary = 'Регистрация пользователя'
      #swagger.parameters['obj'] = {
                in: 'body',
                description: 'user',
                required: true,
                schema: { $ref: "#/definitions/User" }
      }
   */
   const password = generatePassword(12, false);
   const salt = await bcrypt.genSalt(10);
   const hash = await bcrypt.hash(password, salt);

   try {
      const doc = new UserModel({
         fio: req.body.fio,
         email: req.body.email,
         telephone: req.body.telephone,
         organization: req.body.organization,
         region: req.body.region,
         business_line: req.body.business_line,
         access_to_open: req.body.access_to_open,
         is_admin: req.body.is_admin,
         balance: req.body.balance,
         passwordHash: hash
      });

      const user = await doc.save();

      const domen = req.get('host');
      Mailer.sendToUser(/*user._id,*/user.email, password, domen)
         .catch((err) => console.log('mail ERROR:', err));

      const { passwordHash, ...userData } = user._doc;

      res.json({
         ...userData
      });
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: "Failed to register: " + err
      })
   }
};

export const log_in = async (req, res) => {
   /*
      #swagger.tags = ["Auth"]
      #swagger.summary = 'Вход в аккаунт'
   */
   try {
      const user = await UserModel.findOne({ $or: [{ email: req.body.login }, { telephone: req.body.login }] });

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

export const getMe = async (req, res) => {
   /*
      #swagger.tags = ["User"]
      #swagger.summary = 'Получить текущего пользователя'
      #swagger.security = [{
               "bearerAuth": []
      }]
   */
   try {
      const user = await UserModel.findById(req.userId).catch((err) => {
         res.status(404).json({
            message: 'user not found'
         })
      });

      const { passwordHash, ...userData } = user._doc;
      res.json(userData);
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: "no access"
      });
   }
};

export const getUserByID = async (req, res) => {
   /*
      #swagger.tags = ["Admin"]
      #swagger.summary = 'Получить одного пользователя по id'
   */
   try {
      const userId = req.params.id;

      const user = await UserModel.findById(userId).catch((err) => {
         res.status(404).json({
            message: 'user not found'
         })
      });

      const { passwordHash, ...userData } = user._doc;
      res.json(userData);
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: "server error"
      });
   }
}

export const getUsers = async (req, res) => {
   /*
      #swagger.tags = ["Admin"]
      #swagger.summary = 'Получить всех пользователей'
   */
   try {
      const users = await UserModel.find().exec().catch((err) => {
         res.status(404).json({
            message: 'users not found'
         })
      });

      res.json(users);
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: "server error"
      });
   }
}

export const removeUser = async (req, res) => {
   /*
      #swagger.tags = ["Admin"]
      #swagger.summary = 'удалить пользователя'
   */
   await UserModel.findByIdAndDelete(req.params.id)
      .then(() => res.json({
         access: true
      })).catch((err) => {
         console.log(err);
         res.status(404).json({
            message: "user not found or delete"
         });
      });
}

export const update = async (req, res) => {
   /*
      #swagger.tags = ["Admin"]
      #swagger.summary = 'изменить пользователя'
      #swagger.parameters['obj'] = {
                in: 'body',
                description: 'user',
                required: true,
                schema: { $ref: "#/definitions/User" }
      }
   */
   await UserModel.updateOne({ _id: req.params.id }, {
      $set: {
         fio: req.body.fio,
         email: req.body.email,
         telephone: req.body.telephone,
         organization: req.body.organization,
         region: req.body.region,
         business_line: req.body.business_line,
         access_to_open: req.body.access_to_open,
         is_admin: req.body.is_admin,
         balance: req.body.balance
      }
   }).then(() => res.json({
      access: true
   })).catch((err) => {
      console.log(err);
      res.status(404).json({
         message: "user not found or update"
      });
   });
}

export const resentPassword = async (req, res) => {
   /*
      #swagger.tags = ["Auth"]
      #swagger.summary = 'Восстановление пароля/повторная отправка'
   */
   try {
      const password = generatePassword(12, false);
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const email = req.body.email;
      await UserModel.updateOne({ "email": email }, { passwordHash: hash })
         .catch((err) => { console.log(err); res.status(404).json({ message: "user not found or update" }) });

      const domen = req.get('host');
      Mailer.sendToUser(email, password, domen)
         .catch((err) => console.log('mail ERROR:', err));

      res.json({
         message: "email send"
      });
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: "Не удалось восстановить пароль"
      })
   }
}

export const transaction1 = async (req, res) => {
   /*
      #swagger.tags = ["User"]
      #swagger.summary = 'перевод другому пользователю'
      #swagger.parameters['obj'] = {
                in: 'body',
                description: 'user',
                required: true,
                schema: { $ref: "#/definitions/User" }
      }
   */
   await UserModel.updateOne({ _id: req.params.id }, {
      $inc: { 'balance': -req.body.sum }
   })
   .then(
      await UserModel.updateOne({ _id: req.body.recipient_id }, {
         $inc: { 'balance': req.body.sum }
      })
      .then(() => res.json({
         access: true
      }))
      .catch((err) => {
         res.status(404).json({ message: 'sum not transition for recipient' })
      }))
   .catch((err) => {
      console.log(err);
      res.status(404).json({
         message: "sum not transition for sender"
      });
   });
}

export const transaction = async (req, res) => {
   /*
      #swagger.tags = ["User"]
      #swagger.summary = 'перевод другому пользователю'
      #swagger.parameters['obj'] = {
                in: 'body',
                description: 'user',
                required: true,
                schema: { $ref: "#/definitions/User" }
      }
   */
   await UserModel.updateOne({ _id: req.params.id }, {
      $inc: { 'balance': -req.body.sum }
   })
   .then(
      await UserModel.updateOne({ _id: req.body.recipient_id }, {
         $inc: { 'balance': req.body.sum }
      })
      .then(() => res.json({
         access: true
      }))
      .catch((err) => {
         res.status(404).json({ message: 'sum not transition for recipient' })
      }))
   .catch((err) => {
      console.log(err);
      res.status(404).json({
         message: "sum not transition for sender"
      });
   });
}
