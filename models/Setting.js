import mongoose, { Schema } from 'mongoose';

const SettingSchema = new mongoose.Schema({
   id: {
      type: Number,
      require: true,
      unique: true
   },
   settings: {
      type: Array,
      require: true
   }
}, {
   timestamps: true,
});

export default mongoose.model("Setting", SettingSchema);