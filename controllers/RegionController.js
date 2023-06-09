import RegionModel from '../models/Region.js';


export const create = async (req, res) => {
    /*
       #swagger.tags = ["Settings"]
       #swagger.summary = 'Создание региона'
    */
    try{
       const doc = new RegionModel({
          country: req.body.country,
          city: req.body.city,
          index: 1
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
 
 export const getAll = async(req,res) => {
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
 
 export const getOne = async(req,res) => {
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

 export const update = async(req,res) => {
   /*
      #swagger.tags = ["Settings"]
      #swagger.summary = 'Поменять коэффициент'
   */   
   await RegionModel.updateOne({_id:req.params.id},{
      country: req.body.country,
      city: req.body.city
}).then(()=> res.json({
         access: true
   })).catch((err)=>{
         console.log(err);
         res.status(404).json({
            message: "region not found or update"
         });
   });
}

export const remove = async(req,res) => {
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

 export const updateIndex = async(req,res) => {
   /*
      #swagger.tags = ["Settings"]
      #swagger.summary = 'Поменять коэффициент'
   */   
   await RegionModel.updateOne({_id:req.params.id},{
      index: req.body.index,
   }).then(()=> res.json({
         access: true
   })).catch((err)=>{
         console.log(err);
         res.status(404).json({
            message: "region not found or update"
         });
   });
}
