import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import fs from 'fs';
import swaggerUi from 'swagger-ui-express';

import { UserController, } from './controllers/index.js';

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
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get('/', (req, res) => {
    res.send('test');
 });

//run server
app.listen(4444, (err) =>{
    if (err){
       return (err);
    }
    console.log('webserver.....OK!');
 });