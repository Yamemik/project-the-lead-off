import CategoryModel from '../models/Category.js';


export const create = async (req, res) => {
    /*
       #swagger.tags = ["Settings"]
       #swagger.summary = 'Создание категории'
    */
    try{
       const doc = new CategoryModel({
         group: req.body.group,
         name: req.body.name
       });
 
       const category = await doc.save();
 
       res.json(category);   
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
       #swagger.summary = 'Получить все категории'
    */   
    try{
       const category = await CategoryModel.find().exec().catch((err)=>{
          res.status(404).json({
             message: 'category not found'
          })
       });
 
       res.json(category);   
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
 
       const category = await CategoryModel.findById(categoryId).catch((err)=>{
          res.status(404).json({
             message: 'category not found'
          })
       });
 
       res.json(category);        
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
   await CategoryModel.updateOne({_id:req.params.id},{
      group: req.body.group,
      name: req.body.name
}).then(()=> res.json({
         access: true
   })).catch((err)=>{
         console.log(err);
         res.status(404).json({
            message: "category not found or update"
         });
   });
}

export const remove = async(req,res) => {
   /*
      #swagger.tags = ["Settings"]
      #swagger.summary = 'удалить категорию'
   */   
   await CategoryModel.findByIdAndDelete(req.params.id)
   .then(()=> res.json({
      access: true
   })).catch((err)=>{
      console.log(err);
      res.status(404).json({
         message: "category not found or delete"
      });
   });
}