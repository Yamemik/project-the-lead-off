import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import fs from 'fs';
import multer from 'multer';
import swaggerUi from 'swagger-ui-express';

import { UserController, OrderController, RegionController, CategoryController, TypeBuyerController,
   IsImmediateController, ScoreController, TypeOrderController } from './controllers/index.js';

import { registerValidation, loginValidation,  } from './validations/AdminValidation.js';
import { createCaregoryValidation, createRegionValidation, createValidationName, updateIndexValidation } from './validations/SettingsValidation.js';
import { createOrderValidation, findDublicateOrderValidation} from './validations/OrderValidation.js';
import { checkAuth, checkAuthIsAdmin, handlValidationErrors, handlers } from './utils/index.js';

//connect db
mongoose.connect('mongodb+srv://admin:admin@cluster0.532y6ot.mongodb.net/lead?retryWrites=true&w=majority')
   .then(() => console.log('db.....ok!!'))
   .catch((err) => console.log('db ERROR:', err));

const app = express();  //create webapp
const router = express.Router();
const swaggerFile = JSON.parse(fs.readFileSync('./swagger/output.json'));
const storage = multer.diskStorage({
   destination: (req, file, cb)=>{
      cb(null,'uploads');
   },
   filename: (req,file,cb)=>{
      cb(null,file.originalname);
   }
});
const uploads = multer({storage});

app.use(express.json());   //add can read .json
app.use(cors());
app.use(handlers);
app.use("/api", router);
app.use('/uploads',express.static('uploads'));
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));


app.get('/', (req, res) => {
    res.send('test of lead-off');
 });

//AUTH
router.post('/auth/reg', checkAuthIsAdmin,registerValidation, handlValidationErrors, UserController.createUser);
router.post('/auth/log', loginValidation, handlValidationErrors, UserController.log_in);

//ADMIN
//users
router.get('/admin/user/:id',checkAuthIsAdmin, UserController.getUserByID);
router.get('/admin/users',checkAuthIsAdmin, UserController.getUsers);
router.patch('/admin/user/:id',checkAuthIsAdmin, registerValidation, handlValidationErrors, UserController.update);
router.delete('/admin/user/:id',checkAuthIsAdmin, UserController.remove);
//orders
router.post('/admin/order',checkAuthIsAdmin, createOrderValidation, handlValidationErrors, OrderController.createOrder);
router.post('/admin/order/finddublicate',checkAuthIsAdmin, findDublicateOrderValidation, handlValidationErrors, OrderController.findDublicate);
router.post('/admin/uploads',checkAuthIsAdmin, uploads.single('file'), OrderController.cpUpload);

//SETTING
//region
router.post('/admin/settings/region',checkAuthIsAdmin, createRegionValidation, handlValidationErrors, RegionController.createRg);
router.get('/admin/settings/region/:id',checkAuthIsAdmin, RegionController.getOneRg);
router.get('/admin/settings/region',checkAuthIsAdmin, RegionController.getAllRg);
router.patch('/admin/settings/region/:id',checkAuthIsAdmin, createRegionValidation, handlValidationErrors, RegionController.updateRg);
router.delete('/admin/settings/region/:id',checkAuthIsAdmin, RegionController.removeRg);
router.patch('/admin/settings/region/:id',checkAuthIsAdmin, createRegionValidation, handlValidationErrors, RegionController.updateIndexRg);
//category
router.post('/admin/settings/category',checkAuthIsAdmin, createCaregoryValidation, handlValidationErrors, CategoryController.createCt);
router.get('/admin/settings/category/:id',checkAuthIsAdmin, CategoryController.getOneCt);
router.get('/admin/settings/category',checkAuthIsAdmin, CategoryController.getAllCt);
router.patch('/admin/settings/category/:id',checkAuthIsAdmin, createCaregoryValidation, handlValidationErrors, CategoryController.updateCt);
router.delete('/admin/settings/category/:id',checkAuthIsAdmin, CategoryController.removeCt);
//score
router.post('/admin/settings/score',checkAuthIsAdmin, createValidationName, handlValidationErrors, ScoreController.createSc);
router.get('/admin/settings/score/:id',checkAuthIsAdmin, ScoreController.getOneSc);
router.get('/admin/settings/score',checkAuthIsAdmin, ScoreController.getAllSc);
router.patch('/admin/settings/score/:id',checkAuthIsAdmin, updateIndexValidation, handlValidationErrors, ScoreController.updateIndexSc);
//type buyer
router.post('/admin/settings/typebuyer',checkAuthIsAdmin, createValidationName, handlValidationErrors, TypeBuyerController.createTB);
router.get('/admin/settings/typebuyer/:id',checkAuthIsAdmin, TypeBuyerController.getOneTB);
router.get('/admin/settings/typebuyer',checkAuthIsAdmin, TypeBuyerController.getAllTB);
router.patch('/admin/settings/typebuyer/:id',checkAuthIsAdmin, updateIndexValidation, handlValidationErrors, TypeBuyerController.updateIndexTB);
//type order
router.post('/admin/settings/typeorder',checkAuthIsAdmin, createValidationName, handlValidationErrors, TypeOrderController.createTO);
router.get('/admin/settings/typeorder/:id',checkAuthIsAdmin, TypeOrderController.getOneTO);
router.get('/admin/settings/typeorder',checkAuthIsAdmin, TypeOrderController.getAllTO);
router.patch('/admin/settings/typeorder/:id',checkAuthIsAdmin, updateIndexValidation, handlValidationErrors, TypeOrderController.updateIndexTO);
//is immediate
router.post('/admin/settings/isimmediate',checkAuthIsAdmin, createValidationName, handlValidationErrors, IsImmediateController.createII);
router.get('/admin/settings/isimmediate/:id',checkAuthIsAdmin, IsImmediateController.getOneII);
router.get('/admin/settings/isimmediate',checkAuthIsAdmin, IsImmediateController.getAllII);
router.patch('/admin/settings/isimmediate/:id',checkAuthIsAdmin, updateIndexValidation, handlValidationErrors, IsImmediateController.updateIndexII);




//USER
router.get('/user/me', checkAuth, UserController.getMe);
//order
router.get('/user/order/:id',checkAuth, OrderController.getOne);
router.get('/user/orders',checkAuth, OrderController.getAll);

router.patch('/user/order/setIsArchive/:id',checkAuth, OrderController.setIsArchive);
router.patch('/user/order/sendCancel/:id',checkAuth, OrderController.sendCancel);




 
//run server
app.listen(7777, (err) =>{
    if (err){
       return (err);
    }
    console.log('webserver.....OK!');
 });