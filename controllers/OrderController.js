import OrderModel from '../models/Order.js';
import UserModel from '../models/User.js';

export const createOrder = async (req, res) => {
   /*
      #swagger.tags = ["Admin"]
      #swagger.summary = 'Создание заявки'
      #swagger.parameters['obj'] = {
                in: 'body',
                description: 'order',
                required: true,
                schema: { $ref: "#/definitions/Order" }
      }
   */
   try {
      const doc = new OrderModel({
         nomeclature: req.body.nomeclature,
         region: req.body.region,
         text: req.body.text,
         upload: req.body.upload,
         email: req.body.email,
         telephone: req.body.telephone,
         fio: req.body.fio,
         score: req.body.score,
         typeBuyer: req.body.type_buyer,
         type_order: req.body.type_order,
         is_urgent: req.body.is_urgent,
         isOpen: req.body.is_open,
         price: req.body.price
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

export const getOne = async (req, res) => {
   /*
      #swagger.tags = ["User"]
      #swagger.summary = 'Получить одну заявку
   */
   try {
      const orderId = req.params.id;

      const order = await OrderModel.findById(orderId).populate(['category1', 'region', 'score', 'isTender', 'isImmediate', 'typeBuyer', 'user']).exec().catch((err) => {
         res.status(404).json({
            message: 'order not found'
         })
      });

      res.json(order);
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: "server error"
      });
   }
}

export const getAll = async (req, res) => {
   /*
      #swagger.tags = ["User"]
      #swagger.summary = 'Получить все заявки'
   */
   try {
      const orders = await OrderModel.find().populate(['category1', 'region', 'score', 'isTender', 'isImmediate', 'typeBuyer', 'user']).exec().catch((err) => {
         res.status(404).json({
            message: 'orders not found'
         })
      });

      res.json(orders);
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: "server error"
      });
   }
}

export const getAllForUser = async (req, res) => {
   /*
      #swagger.tags = ["User"]
      #swagger.summary = 'Получить все заявки по номенклатуре и региону пользователя'
   */
   try {
      const user = await UserModel.findById(req.userId)
         .catch((err) => {
            res.status(404).json({
               message: 'user not found'
            })
         });

      const orders = await OrderModel.find({
         $or: [
            { nomeclature: { $all: user.business_line } },
            { region: { $in: user.region } }
         ]
      })
         .catch((err) => {
            res.status(404).json({
               message: 'orders not found'
            })
         });

      res.json(orders);
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: "server error"
      });
   }
}


export const remove = async (req, res) => {
   /*
      #swagger.tags = ["Admin"]
      #swagger.summary = 'удалить заказ'
   */
   await OrderModel.findByIdAndDelete(req.params.id)
      .then(() => res.json({
         access: true
      })).catch((err) => {
         console.log(err);
         res.status(404).json({
            message: "order not found or delete"
         });
      });
}

export const updateOrder = async (req, res) => {
   /*
      #swagger.tags = ["Admin"]
      #swagger.summary = 'изменить заявку'
      #swagger.parameters['obj'] = {
                in: 'body',
                description: 'order',
                required: true,
                schema: { $ref: "#/definitions/Order" }
      }
   */
   await OrderModel.updateOne({ _id: req.params.id }, {
      $set: {
         nomeclature: req.body.nomeclature,
         region: req.body.region,
         text: req.body.text,
         upload: req.body.upload,
         email: req.body.email,
         telephone: req.body.telephone,
         fio: req.body.fio,
         score: req.body.score,
         typeBuyer: req.body.type_buyer,
         type_order: req.body.type_order,
         is_urgent: req.body.is_urgent,
         isOpen: req.body.is_open,
         price: req.body.price,
         isArchive: req.body.is_archive,
         is_sale: req.body.is_sale,
         is_express: req.body.is_express,
         user: req.body.user,
         date_buy: req.body.date_buy,
         isBuy: req.body.is_buy,
         isCanceled: req.body.is_canceled,
         isCanceledText: req.body.is_canceled_text,
         isCancel: req.body.is_cancel
      }
   }).then(() => res.json({
      access: true
   })).catch((err) => {
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

   try {
      const now = new Date();
      now.setDate(now.getDate() - 6);

      const ordersDuplicate = await OrderModel.find({
         $or: [{ email: req.body.email }, { telephone: { $all: req.body.telephone } }],
         isArchive: false,
         isBuy: false
      })
         .exec().catch((err) => {
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

export const addUser = async (req, res) => {
   /*
      #swagger.tags = ["User"]
      #swagger.summary = 'добавить пользователя во владельцы заказом(покупка)'
   */
   const now = new Date();
   await OrderModel.updateOne({ _id: req.params.id }, {
      user: req.userId,
      date_buy: now
   }).then(() => res.json({
      access: true
   })).catch((err) => {
      console.log(err);
      res.status(404).json({
         message: "error buy"
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
   }).then(() => res.json({
      access: true
   })).catch((err) => {
      console.log(err);
      res.status(404).json({
         message: "failed to upload"
      });
   });
}

export const sendCancel = async (req, res) => {
   /*
      #swagger.tags = ["User"]
      #swagger.summary = 'отправить заявку на отмену'
   */
   const now = new Date();
   now.setDate(now.getDate() - 1);
   await OrderModel.updateOne({ _id: req.params.id }, {
      isCanceled: true,
      isCanceledText: req.body.isCanceledText
   }).then(() => res.json({
      access: true
   })).catch((err) => {
      console.log(err);
      res.status(404).json({
         message: "order not found or update"
      });
   });
}

export const setIsArchive = async (req, res) => {
   /*
      #swagger.tags = ["User"]
      #swagger.summary = 'установить заявке архив'
   */
   await OrderModel.updateOne({ _id: req.params.id }, {
      isArchive: true,
   }).then(() => res.json({
      access: true
   })).catch((err) => {
      console.log(err);
      res.status(404).json({
         message: "order not found or update"
      });
   });
}


//отчетность
export const getAllWithFilter = async (req, res) => {
   /*
      #swagger.tags = ["Admin"]
      #swagger.summary = 'Получить все заявки по фильтру для отчетности'
   */
   try {
      const orders = await OrderModel.find(
         {
            $set: {
               user: { $in: req.body.user },
               region: { $in: req.body.region },
               nomeclature: { $all: req.body.nomeclature },
               score: { $in: req.body.score },
               typeBuyer: { $in: req.body.typeBuyer },
               isTender: { $in: req.body.isTender },
               isImmediate: { $in: req.body.isImmediate },
               price: { $in: req.body.price },
               isArchive: { $in: req.body.isArchive },
               isDiscount: { $in: req.body.isDiscount },
               is_express: { $in: req.body.is_express },
               isCancel: { $in: req.body.isCancel }
            }
         }
      )
         .catch((err) => {
            res.status(404).json({
               message: 'orders not found'
            })
         });

      res.json(orders);
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: "server error"
      });
   }
}

