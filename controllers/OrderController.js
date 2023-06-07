import OrderModel from '../models/Order.js';

export const createOrder = async (req, res) => {
   /*
      #swagger.tags = ["Auth"]
      #swagger.summary = 'Регистрация пользователя'
   */

   try{
      const doc = new OrderModel({
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
      #swagger.summary = 'Получить текущего пользователя'
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

export const cpUpload = async (req, res) => {
   /*
      #swagger.tags = ["Order"]
      #swagger.summary = 'Загрузка файла'
   */
   res.json({
      url: `/uploads/${req.file.originalname}`
   }).then(()=> res.json({
      access: true
   })).catch((err)=>{
      console.log(err);
      res.status(404).json({
         message: "failed to upload"
      });
   });

   
}