import mongoose, { Schema } from 'mongoose';

const TypeBuyerSchema = new mongoose.Schema({  
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

export default mongoose.model("TypeBuyer",TypeBuyerSchema);