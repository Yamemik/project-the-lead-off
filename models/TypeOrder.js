import mongoose, { Schema } from 'mongoose';

const TypeOrderSchema = new mongoose.Schema({  
   name:{
      type: String,
      require: true
   },
   index:{
      type: Number,
      default: 0
   }
},{
   timestamps: true,
});

export default mongoose.model("TypeOrder",TypeOrderSchema);