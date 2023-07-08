import mongoose, { Schema } from 'mongoose';

const SettingSchema = new mongoose.Schema({  
   settings:{
      type: Array,
      require: true
   }
},{
   timestamps: true,
});

export default mongoose.model("Setting",SettingSchema);