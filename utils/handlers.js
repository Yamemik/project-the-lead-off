import OrderModel from '../models/Order.js';


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
         is_archive: true
      }
   )
   .catch((err) => {
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
   )
   .catch((err) => {
      console.log(err);
   });

   next();
}
