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

   const del_orders = await OrderModel.find({ is_active: false }).catch((err) => {
      console.log(err);
   });

   if (Object.keys(del_orders).length != 0) {
      await OrderDelModel.create(del_orders).catch((err) => {
         console.log(err);
      });
      await OrderModel.deleteMany({ is_active: false }).catch((err) => {
         console.log(err);
      });
   }

   next();
}
