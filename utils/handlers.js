import OrderModel from '../models/Order.js';
import RegionModel from '../models/Region.js';


export default async (req,res,next) => {
   /*
      #swagger.tags = ["Admin"]
      #swagger.summary = 'изменить пользователя'
   */
   const nowArchive = new Date();
   nowArchive.setDate(nowArchive.getDate() - 5);

   await OrderModel.updateMany({createdAt: { $lte: nowArchive}, isArchive: false},{
      isArchive: true
   }).catch((err)=>{
         console.log(err);
   });

   const nowDiscount = new Date();
   nowDiscount.setDate(nowDiscount.getDate() - 3);

   await OrderModel.updateMany({createdAt: { $lte: nowDiscount}, isDiscount: false, isArchive: false},{
      isDiscount: true
   }).catch((err)=>{
         console.log(err);
   });

   next();
}