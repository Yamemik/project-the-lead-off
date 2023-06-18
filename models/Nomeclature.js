import mongoose, { Schema } from 'mongoose';

const NomeclatureSchema = new mongoose.Schema({  
   group:{
      type: mongoose.Schema.Types.ObjectId,      
      ref: 'Category',
   },
   name:{
      type: String,
      require: true
   }
},{
   timestamps: true,
});

export default mongoose.model("Nomeclature",NomeclatureSchema);