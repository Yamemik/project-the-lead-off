import TypeBuyerModel from '../models/TypeBuyer.js';


export const create = async (req, res) => {
    /*
       #swagger.tags = ["Settings"]
       #swagger.summary = 'Создание типa организации'
    */
    try{
       const doc = new TypeBuyerModel({
         name: req.body.name,
         index: 1
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
 
 export const getAll = async(req,res) => {
    /*
       #swagger.tags = ["Settings"]
       #swagger.summary = 'Получить все типы организации'
    */   
    try{
       const entity = await TypeBuyerModel.find().exec().catch((err)=>{
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
 
 export const getOne = async(req,res) => {
    /*
       #swagger.tags = ["Settings"]
       #swagger.summary = 'Получить одну категорию'
    */   
    try{
       const categoryId = req.params.id;
 
       const entity = await TypeBuyerModel.findById(categoryId).catch((err)=>{
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
 };

 export const update = async(req,res) => {
   /*
      #swagger.tags = ["Settings"]
      #swagger.summary = 'Изменить категорию'
   */   
   await TypeBuyerModel.updateOne({_id:req.params.id},{
      group: req.body.group,
      name: req.body.name
}).then(()=> res.json({
         access: true
   })).catch((err)=>{
         console.log(err);
         res.status(404).json({
            message: "not found or update"
         });
   });
}

export const remove = async(req,res) => {
   /*
      #swagger.tags = ["Settings"]
      #swagger.summary = 'удалить категорию'
   */   
   await TypeBuyerModel.findByIdAndDelete(req.params.id)
   .then(()=> res.json({
      access: true
   })).catch((err)=>{
      console.log(err);
      res.status(404).json({
         message: "not found or delete"
      });
   });
}