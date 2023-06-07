import mongoose, { Schema } from 'mongoose';

const RegionSchema = new mongoose.Schema({  
   country:{
      type: String,
      require: true
   },
   city:{
      type: String,
      require: false,
      unique: true
   },
   index:{
      type: Number,
      require: true
   }
},{
   timestamps: true,
});

export default mongoose.model("Region",RegionSchema);