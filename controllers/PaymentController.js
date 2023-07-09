import PaymentSchema from '../models/Payment.js';


export const getAllPay = async (req, res) => {
   /*
      #swagger.tags = ["User"]
      #swagger.summary = 'Получить все платежи пользователя'
   */
   try {
      const entity = await PaymentSchema.find({ user_id: req.userId })
         .catch((err) => {
            res.status(404).json({
               message: 'not found payment'
            })
         });

      res.json(entity);
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: "server error"
      });
   }
}

export const createPay = async (req, res) => {
   /*
      #swagger.tags = ["User"]
      #swagger.summary = 'создать запись с платежом '
      #swagger.parameters['obj'] = {
                in: 'body',
                description: 'payment',
                required: true,
                schema: { $ref: "#/definitions/Payment" }
      }
   */
   try {
      const doc = new PaymentSchema({
         payment: req.body.payment,
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
};
