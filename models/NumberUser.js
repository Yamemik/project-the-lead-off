import mongoose, { Schema } from 'mongoose';

const NumberUserSchema = new mongoose.Schema({
   id: {
      type: Number,
      require: true,
      default: 1,
      unique: true
   },
   number: {
      type: Number,
      require: true,
      default: 1
   }
}, {
   timestamps: true,
});

export default mongoose.model("NumberUser", NumberUserSchema);