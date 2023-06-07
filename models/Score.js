import mongoose, { Schema } from 'mongoose';

const ScoreSchema = new mongoose.Schema({  
   name:{
      type: String,
      require: false
   },
   index:{
      type: Number,
      require: true
   }
},{
   timestamps: true,
});

export default mongoose.model("Score",ScoreSchema);