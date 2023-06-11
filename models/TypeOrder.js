import mongoose, { Schema } from 'mongoose';

const TypeOrderSchema = new mongoose.Schema({  
   name:{
      type: String,
      require: true
   },
   index:{
      type: Number,
      require: true
   }
},{
   timestamps: true,
});

export default mongoose.model("TypeOrder",TypeOrderSchema);