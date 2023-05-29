import mongoose, { Schema } from 'mongoose';

const AdminSchema = new mongoose.Schema({  
   fio:{
      type: String,
      required: false
   },
   login:{
      type: String,
      required: true,
      unique: true      
   },
   passwordHash:{
      type: String,
      require: true
   }
},{
   timestamps: true,
});

export default mongoose.model("Admin",AdminSchema);