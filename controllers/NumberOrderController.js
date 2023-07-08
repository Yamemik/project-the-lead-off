import NumberOrder from '../models/NumberOrder.js';


 export const getAllNo = async(req,res) => {
    /*
       #swagger.tags = ["Added"]
    */   
    try{
       const entity = await NumberOrder.find().catch((err)=>{
          res.status(404).json({
             message: 'not found'
          })
       });
 
       res.json(entity);   
    }catch(err){
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
   try{
      const doc = new NumberOrder({
      });

      const entity = await doc.save();

      res.json(entity);   
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: "Failed to create"
      })
   }
};
