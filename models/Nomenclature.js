import mongoose, { Schema } from 'mongoose';

const NomenclatureSchema = new mongoose.Schema({  
   group:{
      type: mongoose.Schema.Types.ObjectId,      
      ref: 'Group',
   },
   name:{
      type: String,
      require: true
   }
},{
   timestamps: true,
});

export default mongoose.model("Nomenclature",NomenclatureSchema);