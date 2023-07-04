import mongoose, { Schema } from 'mongoose';

const CategorySchema = new mongoose.Schema({  
   category:{
      type: Array,
      require: true
   },
   basePrice:{
      type: Number,
      default: 0
   }
},{
   timestamps: true,
});

export default mongoose.model("Category",CategorySchema);