import YooKassa from 'yookassa';
import dotenv from 'dotenv';

import UserModel from '../models/User.js';
import PaymentModel from '../models/Payment.js';


dotenv.config();
const yooKassa = new YooKassa({
   shopId: process.env.SHOPID,
   secretKey: process.env.SECRETKEY
});

export default async (req, res, next) => {
   try{
      const payments = await PaymentModel.find({ status: "pending" })
      .catch((err) => { console.log(err) });

      if (!(Object.keys(payments).length === 0)) {
         for (let payment of payments) {
            const payment_ukassa = await yooKassa.getPayment(payment.payment.id)
            .catch((err) => { console.log(err) });

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
               const user = await UserModel.findById(payment.user_id);
               let count_amount = payment_ukassa.income_amount.value;

               if(user.credit > 0 || user.credit < count_amount) {
                  count_amount -= user.credit;
                  await UserModel.findByIdAndUpdate(payment.user_id, {
                     $inc: { 'balance': count_amount },
                     credit: 0
                  })
                  .catch((err) => { console.log(err) });
               }
               if(user.credit > 0 || user.credit > count_amount) {
                  const credit_balance = user.credit - count_amount;
                  await UserModel.findByIdAndUpdate(payment.user_id, {
                     credit: credit_balance
                  })
                  .catch((err) => { console.log(err) });
               }
               if(user.credit == 0) {
                  await UserModel.findByIdAndUpdate(payment.user_id, {
                     $inc: { 'balance': payment_ukassa.income_amount.value }
                  })
                  .catch((err) => { console.log(err) });
               }

               await PaymentModel.findByIdAndUpdate(payment._id, {
                  status: payment_ukassa.status,
                  payment: payment_ukassa
               })
               .catch((err) => { console.log(err) });
            }
         }
      }
      next();
   } catch (err) {
      console.log(err);
   }
}
