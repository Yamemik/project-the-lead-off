import mongoose, { Schema } from 'mongoose';

const NomeclatureSchema = new mongoose.Schema({  
   group:{
      type: mongoose.Schema.Types.ObjectId,      
      ref: 'Group',
      required: true
   },
   nomeclature:{
      type: String,
      require: false,
      unique: true
   },
   basePrice:{
      type: Number,
      require: true
   }
},{
   timestamps: true,
});

export default mongoose.model("Nomeclature",NomeclatureSchema);