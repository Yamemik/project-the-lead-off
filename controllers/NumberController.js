import NumberOrder from '../models/NumberOrder.js';
import NumberUser from '../models/NumberUser.js';


//order`s number
export const getAllNo = async (req, res) => {
   /*
      #swagger.tags = ["Added"]
   */
   try {
      const entity = await NumberOrder.find().catch((err) => {
         res.status(404).json({
            message: 'not found'
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

export const createNo = async (req, res) => {
   /*
      #swagger.tags = ["Added"]
   */
   try {
      const doc = new NumberOrder({});

      const entity = await doc.save();

      res.json(entity);
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: "Failed to create"
      })
   }
};

//user`s number
export const CreateUserNumber = async (req, res) => {
   /*
      #swagger.tags = ["Added"]
   */
   try {
      const doc = new NumberUser({});

      const entity = await doc.save();

      res.json(entity);
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: "Failed to create"
      })
   }
};

export const GetNumberUser = async (req, res) => {
   /*
      #swagger.tags = ["Added"]
   */
   try {
      const object = await NumberUser.findOne({ id: 1 }).catch((err) => {
         res.status(404).json({
            message: 'not found'
         })
      });

      res.json(object);
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: "server error"
      });
   }
}

