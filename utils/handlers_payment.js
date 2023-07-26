import YooKassa from 'yookassa';

import UserModel from '../models/User.js';
import PaymentModel from '../models/Payment.js';


const yooKassa = new YooKassa({
   shopId: '227279',
   secretKey: 'test_l5sT9pGKy8Z18UwCZZY_mMohXIjCQ0fKq9e8m-AP6CE'
});

export default async (req, res, next) => {
   const payments = await PaymentModel.find({ status: "pending" })
   .catch((err) => { console.log(err) });

   console.log(Object.keys(payments).length)

   if (!(Object.keys(payments).length === 0)) {
      for (let payment of payments) {
         const payment_ukassa = await yooKassa.getPayment(payment.payment.id);

         if (payment_ukassa.status == 'pending') {
            continue;
         }
         payment_ukassa._instance = {}

         if (payment_ukassa.status == 'canceled') {
            await PaymentModel.findByIdAndUpdate(payment._id, {
               status: payment_ukassa.status,
               payment: payment_ukassa
            })
            .catch((err) => { console.log(err) });
         }

         if (payment_ukassa.status == 'succeeded') {
            await PaymentModel.findByIdAndUpdate(payment._id, {
               status: payment_ukassa.status,
               payment: payment_ukassa
            })
            .catch((err) => { console.log(err) });
            await UserModel.findByIdAndUpdate(payment.user_id, {
               $inc: { 'balance': payment_ukassa.amount.value }
            });
         }
      }
   }
   next();
}
