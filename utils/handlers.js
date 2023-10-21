import OrderModel from '../models/Order.js';
import OrderDelModel from '../models/OrderDelete.js';


export default async (req, res, next) => {
   /*
      #swagger.tags = ["Admin"]
      #swagger.summary = 'изменить пользователя'
   */
   const nowArchive = new Date();
   nowArchive.setDate(nowArchive.getDate() - 5);

   await OrderModel.updateMany(
      {
         date_buy: { $lte: nowArchive },
         is_archive: false
      },
      {
         is_archive: true,
         is_archive_date: new Date()
      }
   ).catch((err) => {
      console.log(err);
   });


   const nowDiscount = new Date();
   nowDiscount.setDate(nowDiscount.getDate() - 3);

   await OrderModel.updateMany(
      {
         createdAt: { $lte: nowDiscount },
         is_sale: false,
         is_archive: false,
         is_buy: false
      },
      {
         is_sale: true
      }
   ).catch((err) => {
      console.log(err);
   });

   const now_active = new Date();
   now_active.setDate(now_active.getDate() - 5);

   await OrderModel.updateMany(
      {
         createdAt: { $lte: now_active },
         is_buy: false
      },
      {
         is_active: false
      }
   ).catch((err) => {
      console.log(err);
   });

   const del_orders = await OrderModel.find({
      is_active: false,
   }).catch((err) => {
      console.log(err);
   });

   if (Object.keys(del_orders).length != 0) {
      for (const order_one of del_orders) {
         const doc = new OrderDelModel({
            number_order: order_one.number_order,
            nomeclature: order_one.nomeclature,
            region: order_one.region,
            text: order_one.text,
            upload: order_one.upload,
            organization: order_one.organization,
            email: order_one.email,
            telephone: order_one.telephone,
            fio: order_one.fio,
            score: order_one.score,
            type_buyer: order_one.type_buyer,
            type_order: order_one.type_order,
            is_urgent: order_one.is_urgent,
            is_open: order_one.is_open,
            price: order_one.price,
            is_cancel: order_one.is_cancel,
            is_active: false,
         });

         await doc.save();
      }

      await OrderModel.deleteMany({
         is_active: false,
      }).catch((err) => {
         console.log(err);
      });
   }

   next();
}
