import RegionModel from '../models/Region.js';


export const createRg = async (req, res) => {
    /*
       #swagger.tags = ["Settings"]
       #swagger.summary = 'Создание региона'
    */
    try{
       const doc = new RegionModel({
          country: req.body.country,
          city: req.body.city,
          index: req.body.index
       });
 
       const region = await doc.save();
 
       res.json(region);   
    } catch (err) {
       console.log(err);
       res.status(500).json({
          message: "Failed to create"
       })
    }
 };
 
 export const getAllRg = async(req,res) => {
    /*
       #swagger.tags = ["Settings"]
       #swagger.summary = 'Получить все регионы'
    */   
    try{
       const regions = await RegionModel.find().exec().catch((err)=>{
          res.status(404).json({
             message: 'region not found'
          })
       });
 
       res.json(regions);   
    }catch(err){
       console.log(err);
       res.status(500).json({
          message: "server error"
       });
    }
 }
 
 export const getOneRg = async(req,res) => {
    /*
       #swagger.tags = ["Settings"]
       #swagger.summary = 'Получить один регион'
    */   
    try{
       const regionId = req.params.id;
 
       const region = await RegionModel.findById(regionId).catch((err)=>{
          res.status(404).json({
             message: 'region not found'
          })
       });
 
       res.json(region);        
    }catch(err){
       console.log(err);
       res.status(500).json({
          message: "server error"
       });
    }
 };

 export const updateRg = async(req,res) => {
   /*
      #swagger.tags = ["Settings"]
      #swagger.summary = 'Изменить регион'
   */   
   await RegionModel.updateOne({_id:req.params.id},{
      $set:{
         country: req.body.country,
         city: req.body.city,
         index: req.body.index
      }   
   }).then(()=> res.json({
         access: true
   })).catch((err)=>{
         console.log(err);
         res.status(404).json({
            message: "region not found or update"
         });
   });
}

export const removeRg = async(req,res) => {
   /*
      #swagger.tags = ["Settings"]
      #swagger.summary = 'удалить регион'
   */   
   await RegionModel.findByIdAndDelete(req.params.id)
   .then(()=> res.json({
      access: true
   })).catch((err)=>{
      console.log(err);
      res.status(404).json({
         message: "region not found or delete"
      });
   });
}
