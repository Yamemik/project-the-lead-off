import mongoose, { Schema } from 'mongoose';

const GroupSchema = new mongoose.Schema({  
   category:{
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

export default mongoose.model("Group",GroupSchema);