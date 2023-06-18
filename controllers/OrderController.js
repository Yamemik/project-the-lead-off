import OrderModel from '../models/Order.js';
import UserModel from '../models/User.js';

export const createOrder = async (req, res) => {
   /*
      #swagger.tags = ["Admin"]
      #swagger.summary = 'Создание заявки'
   */

   try{      
      const doc = new OrderModel({
         category: req.body.category,
         region: req.body.region,
         text: req.body.text,
         upload: req.body.upload,
         email: req.body.email,
         telephone: req.body.telephone,
         fio: req.body.fio,
         score: req.body.score,
         typeBuyer: req.body.typeOfBuyer,
         isTender: req.body.isTender,
         isImmediate: req.body.isImmediate,
         isOpen: req.body.isOpen,
         is_express: true,
         price: req.body.price,
         isArchive: false,
         isDiscount: false,
         isCancel: false
      });

      const order = await doc.save();

      res.json(order);
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: "Failed to created"
      });
   }
}

export const getOne = async(req,res) => {
   /*
      #swagger.tags = ["User"]
      #swagger.summary = 'Получить одну заявку
   */   
   try{
      const orderId = req.params.id;

      const order = await OrderModel.findById(orderId).populate(['category1','region','score','isTender', 'isImmediate', 'typeBuyer', 'user']).exec().catch((err)=>{
         res.status(404).json({
            message: 'order not found'
         })
      });

      res.json(order);        
   }catch(err){
      console.log(err);
      res.status(500).json({
         message: "server error"
      });
   }
}

export const getAll = async(req,res) => {
   /*
      #swagger.tags = ["User"]
      #swagger.summary = 'Получить все заявки'
   */   
   try{
      const orders = await OrderModel.find().populate(['category1','region','score','isTender', 'isImmediate', 'typeBuyer', 'user']).exec().catch((err)=>{
         res.status(404).json({
            message: 'orders not found'
         })
      });

      res.json(orders);   
   }catch(err){
      console.log(err);
      res.status(500).json({
         message: "server error"
      });
   }
}

export const getAllWithFilter = async(req,res) => {
   /*
      #swagger.tags = ["User"]
      #swagger.summary = 'Получить все заявки по номенклатуре и региону пользователя'
   */   
   try{
      const user = await UserModel.findById(req.userId)
      .catch((err)=>{
         res.status(404).json({
            message: 'user not found'
         })
      });
      
      const orders = await OrderModel.find({ $or:[
         {nomeclature:  { $all: user.business_line }},
         {region:       {$in: user.region }}
         ]
      })
      .catch((err)=>{
         res.status(404).json({
            message: 'orders not found'
         })
      });

      res.json(orders);   
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
      #swagger.summary = 'удалить заказ'
   */   
   await OrderModel.findByIdAndDelete(req.params.id)
   .then(()=> res.json({
      access: true
   })).catch((err)=>{
      console.log(err);
      res.status(404).json({
         message: "order not found or delete"
      });
   });
}

export const update = async(req,res) => {
   /*
      #swagger.tags = ["Admin"]
      #swagger.summary = 'изменить заказ'
   */   
   await OrderModel.updateOne({_id:req.params.id},{
      category1: req.body.category1,
      category2: req.body.category2,
      category3: req.body.category3,
      region: req.body.region,
      text: req.body.text,
      upload: req.body.upload,
      email: req.body.email,
      telephone: req.body.telephone,
      fio: req.body.fio,
      score: req.body.score,
      typeBuyer: req.body.typeOfBuyer,
      isTender: req.body.isTender,
      isImmediate: req.body.isImmediate,
      isOpen: req.body.isOpen,
      price: req.body.price,
      isArchive: false,
      isDiscount: false,
      isCancel: false
}).then(()=> res.json({
         access: true
   })).catch((err)=>{
         console.log(err);
         res.status(404).json({
            message: "order not found or update"
         });
   });
}

export const findDublicate = async (req, res) => {
   /*
      #swagger.tags = ["Admin"]
      #swagger.summary = 'Получить дубли'
   */

   try{      
      const now = new Date();
      now.setDate(now.getDate() - 6);   

      const ordersDuplicate = await OrderModel.find({$or:[{email:req.body.email},{telephone: req.body.telephone}],
         isArchive: false, isCancel: false})
      .exec().catch((err)=>{
         res.status(404).json({
            message: 'orders not found'
         })
      }); 

      res.json(ordersDuplicate);
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: "Failed to created"
      });
   }
}

export const addUser = async(req,res) => {
   /*
      #swagger.tags = ["User"]
      #swagger.summary = 'добавить пользователя во владельцы заказом'
   */
   await OrderModel.updateOne({_id:req.params.id},{
      user: req.userId
   }).then(()=> res.json({
         access: true
   })).catch((err)=>{
         console.log(err);
         res.status(404).json({
            message: "order not found or update"
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

export const setIsArchive = async(req,res) => {
   /*
      #swagger.tags = ["User"]
      #swagger.summary = 'установить заявке архив'
   */   
   await OrderModel.updateOne({_id:req.params.id},{
      isArchive: true,
   }).then(()=> res.json({
         access: true
   })).catch((err)=>{
         console.log(err);
         res.status(404).json({
            message: "order not found or update"
         });
   });
}

export const setIsDiscount = async(req,res) => {
   /*
      #swagger.tags = ["User"]
      #swagger.summary = 'установить заявке распродажа'
   */   
   await OrderModel.updateOne({_id:req.params.id},{
      isDiscount: true,
   }).then(()=> res.json({
         access: true
   })).catch((err)=>{
         console.log(err);
         res.status(404).json({
            message: "order not found or update"
         });
   });
}

export const sendCancel = async(req,res) => {
   /*
      #swagger.tags = ["User"]
      #swagger.summary = 'отправить заявку на отмену'
   */   
   await OrderModel.updateOne({_id:req.params.id},{
      isCanceled: true,
      isCanceledText: req.body.isCanceledText
   }).then(()=> res.json({
         access: true
   })).catch((err)=>{
         console.log(err);
         res.status(404).json({
            message: "order not found or update"
         });
   });
}

export const setIsCancel = async(req,res) => {
   /*
      #swagger.tags = ["Admin"]
      #swagger.summary = 'одобрить или отказать отмене'
   */   
   await OrderModel.updateOne({_id:req.params.id},{
      isCancel: true
   }).then(()=> res.json({
         access: true
   })).catch((err)=>{
         console.log(err);
         res.status(404).json({
            message: "order not found or update"
         });
   });
}
