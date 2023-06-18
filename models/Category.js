import mongoose, { Schema } from 'mongoose';

const CategorySchema = new mongoose.Schema({  
   name:{
      type: String,
      require: true
   },
   basePrice:{
      type: Number,
      require: true
   }
},{
   timestamps: true,
});

export default mongoose.model("Category",CategorySchema);