import OrderModel from '../models/Order.js';
import UserModel from '../models/User.js';
import NumberOrder from '../models/NumberOrder.js';
import PaymentSchema from '../models/Payment.js';


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
      const number = await NumberOrder.findOneAndUpdate({},
         {$inc : {'number' : 1}})
      .catch((err)=>{
            console.log(err);
            res.status(404).json({
               message: "not found or update (SettingModel)"
            });
      });        

      const doc = new OrderModel({
         number_order: number.number,
         nomeclature: req.body.nomeclature,
         region: req.body.region,
         text: req.body.text,
         upload: req.body.upload,
         email: req.body.email,
         telephone: req.body.telephone,
         fio: req.body.fio,
         score: req.body.score,
         type_buyer: req.body.type_buyer,
         type_order: req.body.type_order,
         is_urgent: req.body.is_urgent,
         is_open: req.body.is_open,
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

      const order = await OrderModel.findById(orderId).populate('user').exec().catch((err) => {
         res.status(404).json({
            message: 'order not found (getOne)'
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
      #swagger.tags = ["Admin"]
      #swagger.summary = 'Получить все заявки'
   */
   try {
      const orders = await OrderModel.find().populate('user').exec().catch((err) => {
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

export const getAllUser = async (req, res) => {
   /*
      #swagger.tags = ["User"]
      #swagger.summary = 'Получить все заявки'
   */
   try {
      const orders = await OrderModel.find().catch((err) => {
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


export const getAllisSale = async (req, res) => {
   /*
      #swagger.tags = ["User"]
      #swagger.summary = 'Получить все заявки is sale'
   */
   try {
      const orders = await OrderModel.find({is_sale: true}).catch((err) => {
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
      #swagger.summary = 'Получить все заявки по номенклатуре и региону пользователя без фильтров'
   */
   try {
      const user = await UserModel.findById(req.userId)
         .catch((err) => {
            res.status(404).json({
               message: 'user not found  (getAllForUser)'
            })
         });

      const orders = await OrderModel.find({
         $or: [
            { nomeclature: { $all: user.business_line } },
            { region: { $all: user.region } }
         ]
      }).catch((err) => {
         res.status(404).json({
            message: 'orders not found (getAllForUser)'
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

export const getAllForUserWithFilter = async (req, res) => {
   /*
      #swagger.tags = ["User"]
      #swagger.summary = 'Получить все заявки по номенклатуре и региону пользователя c фильтрами'
   */
   try {
      const orders = await OrderModel.find({
         nomeclature: { $in: req.body.nomeclature },
         region: { $in: req.body.region },
         score: { $in: req.body.score },
         type_buyer: { $in: req.body.type_buyer },
         type_order: { $in: req.body.type_order },
         is_urgent: { $in: req.body.is_urgent },
         price: { $gte: req.body.price_min },
         price: { $lte: req.body.price_max }
      }).catch((err) => {
            console.log(err);
            res.status(404).json({
               message: 'orders not found(getAllForUserWithFilter)'
            });
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

export const removeMany = async (req, res) => {
   /*
      #swagger.tags = ["Admin"]
      #swagger.summary = 'удалить заказы'
   */
   await OrderModel.deleteMany({ _id: { $in: req.body.orders } })
      .then(() => res.json({
         access: true
      })).catch((err) => {
         console.log(err);
         res.status(404).json({
            message: "orders not found or delete"
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
         type_buyer: req.body.type_buyer,
         type_order: req.body.type_order,
         is_urgent: req.body.is_urgent,
         is_open: req.body.is_open,
         price: req.body.price,
         is_archive: req.body.is_archive,
         is_sale: req.body.is_sale,
         is_express: req.body.is_express,
         user: req.body.user,
         date_buy: req.body.date_buy,
         is_buy: req.body.is_buy,
         is_canceled: req.body.is_canceled,
         is_canceled_text: req.body.is_canceled_text,
         is_cancel: req.body.is_cancel
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
         is_archive: false,
         is_buy: false
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

export const buyOrder = async (req, res) => {
   /*
      #swagger.tags = ["User"]
      #swagger.summary = 'добавить пользователя во владельцы заказом(покупка)'
   */
   const now = new Date();
   const order = await OrderModel.findOneAndUpdate({ _id: req.params.id }, {
      user: req.userId,
      date_buy: now,
      is_buy: true
   })
   .catch((err) => {
      console.log(err);
      res.status(404).json({
         message: "error buy (not found order)"
      });
   });

   const user = await UserModel.findOneAndUpdate({ _id: req.userId }, {
      $inc: { 'balance': -req.body.sum }
   })
   .catch((err) => {
      res.status(404).json({ message: 'sum not buy' })
   });
   user.passwordHash = '';

   const payment = {
      date: now,
      status: "buy",      
      sum: req.body.sum,
      user: user,
      order: order
   }

   try {
      const doc = new PaymentSchema({
         payment: payment,
         user_id: req.userId
      });

      const entity = await doc.save();

      res.json(entity);
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: "Failed create to pay"
      })
   }

}

export const cpUpload = async (req, res) => {
   /*
      #swagger.tags = ["Order"]
      #swagger.summary = 'Загрузка файлов'
   */
   try {
      return res.json(req.files);
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: "Failed to uploads"
      });
   }
}

export const sendCancel = async (req, res) => {
   /*
      #swagger.tags = ["User"]
      #swagger.summary = 'отправить заявку на отмену'
   */
   await OrderModel.updateOne({ _id: req.params.id }, {
      is_canceled: true,
      is_canceled_text: req.body.is_canceled_text
   }).then(() => res.json({
      access: true
   })).catch((err) => {
      console.log(err);
      res.status(404).json({
         message: "order not found or update"
      });
   });
}

export const cancelIsCanceled = async (req, res) => {
   /*
      #swagger.tags = ["Admin"]
      #swagger.summary = 'отменить отмену '
   */
   await OrderModel.updateOne({ _id: req.params.id }, {
      is_canceled: false,
      is_canceled_text: req.body.is_canceled_text,
      is_cancel: true
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
      is_archive: req.body.is_archive,
      is_archive_date: new Date()
   }).then(() => res.json({
      access: true
   })).catch((err) => {
      console.log(err);
      res.status(404).json({
         message: "order not found or update"
      });
   });
}

export const refund = async (req, res) => {
   /*
      #swagger.tags = ["Admin"]
      #swagger.summary = 'отменить заказ юзеру и вернуть деньги'
   */
   const now = new Date();
   const order = await OrderModel.findOneAndUpdate({ _id: req.params.order_id }, {
      is_buy: false,
      is_canceled: false,
      is_canceled_text: '',
      user: req.userId
   })
   .catch((err) => {
      console.log(err);
      res.status(404).json({
         message: "error refund (not found order)"
      });
   });

   const user = await UserModel.findOneAndUpdate({ _id: order.user._id }, {
      $inc: { 'balance': order.price }
   })
   .catch((err) => {
      res.status(404).json({ message: 'sum not refund' })
   });
   user.passwordHash = '';

   const payment = {
      date: now,
      status: "refund",      
      user: user,
      order: order
   }

   try {
      const doc = new PaymentSchema({
         payment: payment,
         user_id: req.userId
      });

      const entity = await doc.save();

      res.json(entity);
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: "Failed create to pay"
      })
   }
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
               type_buyer: { $in: req.body.type_buyer },
               type_order: { $in: req.body.type_order },
               is_urgent: { $in: req.body.is_urgent },
               price: { $gte: req.body.price_min },
               price: { $lte: req.body.price_max },
               is_archive: { $in: req.body.is_archive },
               is_sale: { $in: req.body.is_sale },
               is_express: { $in: req.body.is_express },
               is_cancel: { $in: req.body.is_cancel }
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

