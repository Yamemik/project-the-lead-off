import mongoose, { Schema } from 'mongoose';

const IsImmediateSchema = new mongoose.Schema({  
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

export default mongoose.model("IsImmediate",IsImmediateSchema);