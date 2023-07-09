import mongoose, { Schema } from 'mongoose';

const NumberOrderSchema = new mongoose.Schema({  
   number:{
      type: Number,
      require: true,
      default: 1
   }
},{
   timestamps: true,
});

export default mongoose.model("NumberOrder",NumberOrderSchema);