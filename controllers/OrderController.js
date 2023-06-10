import OrderModel from '../models/Order.js';

export const createOrder = async (req, res) => {
   /*
      #swagger.tags = ["Admin"]
      #swagger.summary = 'Создание заявки'
   */

   try{
      const doc = new OrderModel({
         productGroup: req.body.productGroup,
         nomenclature: req.body.nomenclature,
         region: req.body.region,
         text: req.body.text,
         upload: req.body.upload,
         email: req.body.email,
         telephone: req.body.telephone,
         fio: req.body.fio,
         score: req.body.score,
         typeBuyer: req.body.typeBuyer,
         isTender: req.body.isTender,
         isImmediate: req.body.isImmediate,
         isOpen: req.body.isOpen,
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

      const order = await OrderModel.findById(orderId).catch((err)=>{
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
      const orders = await OrderModel.find().exec().catch((err)=>{
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
