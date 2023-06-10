import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import fs from 'fs';
import multer from 'multer';
import swaggerUi from 'swagger-ui-express';

import { UserController, OrderController, RegionController, CategoryController } from './controllers/index.js';

import { registerValidation, loginValidation,createRegionValidation, createCaregoryValidation } from './validations/AdminValidation.js';
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
    res.send('test of leads');
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
router.post('/admin/order',checkAuthIsAdmin, OrderController.createOrder);
router.post('/admin/uploads',checkAuthIsAdmin, uploads.single('file'), OrderController.cpUpload);

//SETTING
//region
router.post('/admin/settings/region',checkAuthIsAdmin, createRegionValidation, handlValidationErrors, RegionController.create);
router.get('/admin/settings/region/:id',checkAuthIsAdmin, RegionController.getOne);
router.get('/admin/settings/region',checkAuthIsAdmin, RegionController.getAll);
router.patch('/admin/settings/region/:id',checkAuthIsAdmin, createRegionValidation, handlValidationErrors, RegionController.update);
router.delete('/admin/settings/region/:id',checkAuthIsAdmin, RegionController.remove);
//router.patch('/admin/settings/region/:id',checkAuthIsAdmin, createRegionValidation, handlValidationErrors, RegionController.updateIndex);
//category
router.post('/admin/settings/category',checkAuthIsAdmin, createCaregoryValidation, handlValidationErrors, CategoryController.create);
router.get('/admin/settings/category/:id',checkAuthIsAdmin, CategoryController.getOne);
router.get('/admin/settings/category',checkAuthIsAdmin, CategoryController.getAll);
router.patch('/admin/settings/category/:id',checkAuthIsAdmin, createCaregoryValidation, handlValidationErrors, CategoryController.update);
router.delete('/admin/settings/category/:id',checkAuthIsAdmin, CategoryController.remove);

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