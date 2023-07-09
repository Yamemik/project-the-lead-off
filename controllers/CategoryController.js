import CategoryModel from '../models/Category.js';


export const createCt = async (req, res) => {
   /*
      #swagger.tags = ["Settings"]
      #swagger.summary = 'Создание категории (корневой эл-т)'
      #swagger.parameters['obj'] = {
                in: 'body',
                description: 'user',
                required: true,
                schema: { $ref: "#/definitions/Category" }
      }
   */
   try {
      const doc = new CategoryModel({
         category: req.body.category,
         basePrice: req.body.base_price
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

export const getAllCt = async (req, res) => {
   /*
      #swagger.tags = ["Settings"]
      #swagger.summary = 'Получить все категории'
   */
   try {
      const category = await CategoryModel.find().exec().catch((err) => {
         res.status(404).json({
            message: 'category not found'
         })
      });

      res.json(category);
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: "server error"
      });
   }
}

export const getOneCt = async (req, res) => {
   /*
      #swagger.tags = ["Settings"]
      #swagger.summary = 'Получить одну категорию'
   */
   try {
      const categoryId = req.params.id;

      const category = await CategoryModel.findById(categoryId).catch((err) => {
         res.status(404).json({
            message: 'category not found'
         })
      });

      res.json(category);
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: "server error"
      });
   }
};

export const updateCt = async (req, res) => {
   /*
      #swagger.tags = ["Settings"]
      #swagger.summary = 'Изменить категорию'
      #swagger.parameters['obj'] = {
                in: 'body',
                description: 'category',
                required: true,
                schema: { $ref: "#/definitions/Category" }
      }
   */
   await CategoryModel.updateOne({ _id: req.params.id }, {
      $set: {
         category: req.body.category,
         basePrice: req.body.base_price
      }
   }).then(() => res.json({
      access: true
   })).catch((err) => {
      console.log(err);
      res.status(404).json({
         message: "category not found or update"
      });
   });
}

export const removeCt = async (req, res) => {
   /*
      #swagger.tags = ["Settings"]
      #swagger.summary = 'удалить категорию'
   */
   await CategoryModel.findByIdAndDelete(req.params.id)
      .then(() => res.json({
         access: true
      })).catch((err) => {
         console.log(err);
         res.status(404).json({
            message: "category not found or delete"
         });
      });
}

export const removeManyCt = async (req, res) => {
   /*
      #swagger.tags = ["Settings"]
      #swagger.summary = 'удалить категории'
   */
   await CategoryModel.deleteMany({_id: { $in: req.body.categories}})
      .then(() => res.json({
         access: true
      })).catch((err) => {
         console.log(err);
         res.status(404).json({
            message: "category not found or delete"
         });
      });
}






export const createGroup = async (req, res) => {
   /*
      #swagger.tags = ["Settings"]
      #swagger.summary = 'Создание группы (средний эл-т иерархии)'
      #swagger.parameters['obj'] = {
                in: 'body',
                description: 'group',
                required: true,
                schema: { $ref: "#/definitions/Group" }
      }
   */
   try {
      const doc = new GroupModel({
         category: req.body.parent,
         name: req.body.name
      });

      const group = await doc.save();

      res.json(group);
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: "Failed to create"
      })
   }
};

export const getAllGroups = async (req, res) => {
   /*
      #swagger.tags = ["Settings"]
      #swagger.summary = 'Получить все группы'
   */
   try {
      const groups = await GroupModel.find().exec().catch((err) => {
         res.status(404).json({
            message: 'groups not found'
         })
      });

      res.json(groups);
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: "server error"
      });
   }
}

export const getOneGroup = async (req, res) => {
   /*
      #swagger.tags = ["Settings"]
      #swagger.summary = 'Получить одну группу'
   */
   try {
      const group = await GroupModel.findById(req.params.id).populate("category")
         .exec().catch((err) => {
            res.status(404).json({
               message: 'group not found'
            })
         });

      res.json(group);
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: "server error"
      });
   }
};

export const createNomenclature = async (req, res) => {
   /*
      #swagger.tags = ["Settings"]
      #swagger.summary = 'Создание номенклатуры (нижний эл-т иерархии)'
      #swagger.parameters['obj'] = {
                in: 'body',
                description: 'nomenclature',
                required: true,
                schema: { $ref: "#/definitions/Nomenclature" }
      }
   */
   try {
      const doc = new NomenclatureModel({
         group: req.body.parent,
         name: req.body.name
      });

      const nomenclature = await doc.save();

      res.json(nomenclature);
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: "Failed to create"
      })
   }
};

export const getAllNoms = async (req, res) => {
   /*
      #swagger.tags = ["Settings"]
      #swagger.summary = 'Получить все номенклатуры'
   */
   try {
      const noms = await NomenclatureModel.find().exec().catch((err) => {
         res.status(404).json({
            message: 'noms not found'
         })
      });

      res.json(noms);
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: "server error"
      });
   }
}

export const getOneNom = async (req, res) => {
   /*
      #swagger.tags = ["Settings"]
      #swagger.summary = 'Получить одну номенклатуру'
   */
   try {
      const nom = await NomenclatureModel.findById(req.params.id).populate({ path: "group", populate: { path: 'category', model: 'Category' } })
         .exec().catch((err) => {
            res.status(404).json({
               message: 'nom not found'
            })
         });

      res.json(nom);
   } catch (err) {
      console.log(err);
      res.status(500).json({
         message: "server error"
      });
   }
};
