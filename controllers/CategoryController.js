import CategoryModel from '../models/Category.js';


export const createCt = async (req, res) => {
    /*
       #swagger.tags = ["Settings"]
       #swagger.summary = 'Создание категории'
       #swagger.ignore = true
    */
    try{
       const doc = new CategoryModel({
         name: req.body.name,
         basePrice: 0
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
 
 export const getAllCt = async(req,res) => {
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
 
 export const getOneCt = async(req,res) => {
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

 export const updateCt = async(req,res) => {
   /*
      #swagger.tags = ["Settings"]
      #swagger.summary = 'Изменить категорию'
      #swagger.ignore = true
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

export const removeCt = async(req,res) => {
   /*
      #swagger.tags = ["Settings"]
      #swagger.summary = 'удалить категорию'
      #swagger.ignore = true
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

export const updateBasePrice = async(req,res) => {
   /*
      #swagger.tags = ["Settings"]
      #swagger.summary = 'добавление базовой цены'
      #swagger.ignored = false
   */   
   await CategoryModel.updateOne({_id:req.params.id},{
      basePrice: req.body.index,
   }).then(()=> res.json({
         access: true
   })).catch((err)=>{
         console.log(err);
         res.status(404).json({
            message: "region not found or update"
         });
   });
}

//category2,3
export const createCt2 = async (req, res) => {
   /*
      #swagger.tags = ["Settings"]
      #swagger.summary = 'Создание категории2,3'
      #swagger.ignored = ignore
   */
   try{
      const doc = new Category2Model({
         parent: req.body.parentID,
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


