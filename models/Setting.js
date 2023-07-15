import mongoose, { Schema } from 'mongoose';

const SettingSchema = new mongoose.Schema({  
   settings:{
      type: Object,
      require: true
   }
},{
   timestamps: true,
});

export default mongoose.model("Setting",SettingSchema);