import OrderModel from '../models/Order.js';
import RegionModel from '../models/Region.js';


export default async (req,res,next) => {
   /*
      #swagger.tags = ["Admin"]
      #swagger.summary = 'изменить пользователя'
   */
   const nowArchive = new Date();
   nowArchive.setDate(nowArchive.getDate() - 5);

   await OrderModel.updateMany(
      {
         date_buy: { $lte: nowArchive},
         isArchive: false
      },
      {
         isArchive: true
      }
   ).catch((err)=>{
         console.log(err);
   });

   const nowDiscount = new Date();
   nowDiscount.setDate(nowDiscount.getDate() - 3);
   const nowBuy = new Date();
   nowBuy.setDate(nowBuy.getDate() - 1);

   await OrderModel.updateMany(
      {
         createdAt: { $lte: nowDiscount},
         isDiscount: false,
         isArchive: false,
         isBuy: false
      },
      {
         isDiscount: true
      }
   ).catch((err)=>{
         console.log(err);
   });

   next();
}
