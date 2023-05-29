import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import fs from 'fs';
import swaggerUi from 'swagger-ui-express';

import { AdminController,UserController } from './controllers/index.js';

import { registerValidation, loginValidation } from './validations/AdminValidation.js';
import { checkAuth, handlValidationErrors } from './utils/index.js';

//connect db
mongoose.connect('mongodb+srv://admin:admin@cluster0.532y6ot.mongodb.net/lead?retryWrites=true&w=majority')
   .then(() => console.log('db.....ok!!'))
   .catch((err) => console.log('db ERROR:', err));

const app = express();  //create webapp
const router = express.Router();

const swaggerFile = JSON.parse(fs.readFileSync('./swagger/output.json'));

app.use(express.json());   //add can read .json
app.use(cors());
app.use("/api", router);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get('/', (req, res) => {
    res.send('test');
 });

 //ADMIN
 router.post('/admin/auth/login', loginValidation, handlValidationErrors, AdminController.login);
 router.post('/admin/user/create', registerValidation, handlValidationErrors, UserController.createUser);

 //USER
 //router.post('/user/auth/login/:userId', loginValidation, handlValidationErrors, UserController.login);

//run server
app.listen(7777, (err) =>{
    if (err){
       return (err);
    }
    console.log('webserver.....OK!');
 });