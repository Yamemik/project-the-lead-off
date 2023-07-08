import SettingModel from '../models/Setting.js';


 export const getAllSt = async(req,res) => {
    /*
       #swagger.tags = ["Settings"]
       #swagger.summary = 'Получить настройки'
    */   
    try{
       const entity = await SettingModel.find().catch((err)=>{
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
 
 export const getOneSt = async(req,res) => {
    /*
       #swagger.tags = ["Settings"]
       #swagger.summary = 'Получение 1 настроек'
    */   
    try{
       const entityId = req.params.id;
 
       const entity = await SettingModel.findById(entityId).catch((err)=>{
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

 export const createSt = async (req, res) => {
   /*
      #swagger.tags = ["Settings"]
      #swagger.summary = 'Создание настроек'
      #swagger.parameters['obj'] = {
                in: 'body',
                description: 'SettingModel',
                required: true,
                schema: { $ref: "#/definitions/Setting" }
      }
   */
   try{
      const doc = new RateModel({
         settings: req.body.is_sale
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

 export const updateSt = async(req,res) => {
   /*
      #swagger.tags = ["Settings"]
      #swagger.summary = 'Измениние настроек'
      #swagger.parameters['obj'] = {
                in: 'body',
                description: 'indexes',
                required: true,
                schema: { $ref: "#/definitions/Setting" }
      }
   */   
   await SettingModel.updateOne({_id:req.params.id},{
      $set: { 
         settings: req.body.is_sale
      }
   }).then(()=> res.json({
         access: true
   })).catch((err)=>{
         console.log(err);
         res.status(404).json({
            message: "not found or update"
         });
   });
}

export const removeSt = async(req,res) => {
   /*
      #swagger.tags = ["Settings"]
      #swagger.summary = 'удалить настроек'
      #swagger.deprecated = true
   */   
   await SettingModel.findByIdAndDelete(req.params.id)
   .then(()=> res.json({
      access: true
   })).catch((err)=>{
      console.log(err);
      res.status(404).json({
         message: "not found or delete"
      });
   });
}

export const removeManySt = async(req,res) => {
   /*
      #swagger.tags = ["Settings"]
      #swagger.summary = 'удалить настроек-ты'
      #swagger.deprecated = true
   */   
   await SettingModel.deleteMany({_id: { $in: req.body.rates}})
   .then(()=> res.json({
      access: true
   })).catch((err)=>{
      console.log(err);
      res.status(404).json({
         message: "not found or delete"
      });
   });
}