import YooKassa from 'yookassa';

import UserModel from '../models/User.js';
import PaymentModel from '../models/Payment.js';


const yooKassa = new YooKassa({
   shopId: '227279',
   secretKey: 'test_l5sT9pGKy8Z18UwCZZY_mMohXIjCQ0fKq9e8m-AP6CE'
 });

export default async (req, res, next) => {
   const payments = await PaymentModel.find({payment:{status: "pending"}})
   .catch((err) => { console.log(err)});

   console.log(typeof(payments))

   if (Object.keys(payments).length === 0) {
      next()
   }

   console.log("sdf")

   /*for (let payment of payments) {
      const payment_ukassa = await yooKassa.getPayment(payment.id);

      if(payment_ukassa.status == 'pending') {
         continue;
      }
      payment_ukassa._instance = {}

      if(payment_ukassa.status == 'canceled') {
         await PaymentModel.findByIdAndUpdate(payment._id, {
            payment: payment_ukassa 
         })
         .catch((err) => { console.log(err)});         
      }
         
  
   }*/


   next();
}
