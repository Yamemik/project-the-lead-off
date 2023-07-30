import mongoose, { Schema } from 'mongoose';

const AboutSchema = new mongoose.Schema({  
   privilege:{
      type: Array,
      require: true
   }
},{
   timestamps: true,
});

export default mongoose.model("About", AboutSchema);