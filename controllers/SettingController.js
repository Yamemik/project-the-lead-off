import SettingModel from '../models/Setting.js';
import AboutModel from '../models/About.js';


export const getAllSt = async (req, res) => {
   /*
      #swagger.tags = ["Settings"]
      #swagger.summary = 'Получить все настройки'
   */
   try {
      const entity = await SettingModel.find().catch((err) => {
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

export const getOneSt = async (req, res) => {
   /*
      #swagger.tags = ["Settings"]
      #swagger.summary = 'Получение 1 настройки'
   */
   try {

      const entity = await SettingModel.findOne({ id: 1 }).catch((err) => {
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
   try {
      const doc = new SettingModel({
         id: 1,
         settings: req.body.settings
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

export const updateSt = async (req, res) => {
   /*
      #swagger.tags = ["Settings"]
      #swagger.summary = 'Изменение настроек'
      #swagger.parameters['obj'] = {
                in: 'body',
                description: 'settings',
                required: true,
                schema: { $ref: "#/definitions/Setting" }
      }
   */
   await SettingModel.findOneAndUpdate({ id: 1 }, {
      $set: {
         settings: req.body.settings
      }
   }).then(() => res.json({
      access: true
   })).catch((err) => {
      console.log(err);
      res.status(404).json({
         message: "not found or update"
      });
   });
}

export const removeSt = async (req, res) => {
   /*
      #swagger.tags = ["Settings"]
      #swagger.summary = 'удалить настройки'
      #swagger.deprecated = true
   */
   await SettingModel.findOneAndDelete({ id: 1 }).then(() => res.json({
      access: true
   })).catch((err) => {
      console.log(err);
      res.status(404).json({
         message: "not found or delete"
      });
   });
}

export const getAllAb = async (req, res) => {
   /*
      #swagger.tags = ["Settings"]
      #swagger.summary = 'получить преимущества'
   */
   try {
      const entity = await AboutModel.find().catch((err) => {
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

export const createAb = async (req, res) => {
   /*
      #swagger.tags = ["Settings"]
      #swagger.summary = 'Создание преимуществ'
      #swagger.parameters['obj'] = {
                in: 'body',
                description: 'AboutModel',
                required: true,
                schema: { $ref: "#/definitions/About" }
      }
   */
   try {
      const doc = new AboutModel({
         privilege: req.body.privilege
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

export const updateAb = async (req, res) => {
   /*
      #swagger.tags = ["Settings"]
      #swagger.summary = 'Изменение преимуществ'
      #swagger.parameters['obj'] = {
                in: 'body',
                description: 'AboutModel',
                required: true,
                schema: { $ref: "#/definitions/About" }
      }
   */
   await AboutModel.findOneAndUpdate({}, {
      $set: {
         privilege: req.body.privilege
      }
   }).then(() => res.json({
      access: true
   })).catch((err) => {
      console.log(err);
      res.status(404).json({
         message: "not found or update"
      });
   });
}
