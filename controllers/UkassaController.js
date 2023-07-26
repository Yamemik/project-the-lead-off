import YooKassa from 'yookassa';
import { v4 as uuidv4 } from 'uuid';

import PaymentSchema from '../models/Payment.js';


const yooKassa = new YooKassa({
  shopId: '227279',
  secretKey: 'test_l5sT9pGKy8Z18UwCZZY_mMohXIjCQ0fKq9e8m-AP6CE'
});


export const payment = async (req, res) => {
  /*
     #swagger.tags = ["User"]
     #swagger.summary = 'payments'
  */
  try {
    const paymentUkassa = await yooKassa.createPayment({
      amount: {
        value: req.body.amount_value,
        currency: "RUB"
      },
      confirmation: {
        type: req.body.type,
        return_url: req.body.return_url
      },
      capture: req.body.capture,
      description: req.body.description,
      metadata: req.body.metadata
    }, uuidv4());
    paymentUkassa._instance = {}

    const doc = new PaymentSchema({
      status: paymentUkassa.status,
      payment: paymentUkassa,
      user_id: req.userId
    });

    const entity = await doc.save();

    res.json(paymentUkassa);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "payment error"
    });
  }
}

export const getPayment = async (req, res) => {
  /*
     #swagger.tags = ["User"]
     #swagger.summary = 'getPayment'
  */
  try {
    const paymentUkassa = await yooKassa.getPayment(
      req.body.payment_id
    );

    res.json(paymentUkassa);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: " get payment error"
    });
  }
}
