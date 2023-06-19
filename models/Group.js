import mongoose, { Schema } from 'mongoose';

const GroupSchema = new mongoose.Schema({  
   category:{
      type: mongoose.Schema.Types.ObjectId,      
      ref: 'Category',
   },
   name:{
      type: String,
      default: 0
   }
},{
   timestamps: true,
});

export default mongoose.model("Group",GroupSchema);