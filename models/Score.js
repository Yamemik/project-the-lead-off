import mongoose, { Schema } from 'mongoose';

const ScoreSchema = new mongoose.Schema({  
   name:{
      type: String,
      require: true
   },
   index:{
      type: Number,
      default: 1
   }
},{
   timestamps: true,
});

export default mongoose.model("Score",ScoreSchema);