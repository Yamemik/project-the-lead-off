import mongoose, { Schema } from 'mongoose';

const CategorySchema = new mongoose.Schema({  
   group:{
      type: String,
      require: true
   },
   name:{
      type: String,
      require: true
   }
},{
   timestamps: true,
});

export default mongoose.model("Category",CategorySchema);