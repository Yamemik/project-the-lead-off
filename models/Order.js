import mongoose, { Schema } from 'mongoose';

const OrderSchema = new mongoose.Schema({  
   productGroup:{
      type: String,
      required: true
   },
   nomenclature:{
      type: String,
      required: true,
      unique: true      
   },
   region:{
      type: mongoose.Schema.Types.ObjectId,      
      ref: 'Region',
   },
   text:{
      type: String,      
      require: false
   },
   upload:{
      type: String,
      require: false
   },
   email:{
      type: String,
      require: false
   },
   telephone:{
      type: Array,
      require: false
   },
   fio:{
      type: String,
      require: false
   },
   score:{
      type: mongoose.Schema.Types.ObjectId,      
      ref: 'Score',
      require: false
   },
   typeBuyer:{
      type: Boolean,
      require: false
   },
   isTender:{
      type: Boolean,
      require: false
   },
   isImmediate:{
      type: Boolean,
      require: false
   },
   isOpen:{
      type: Boolean,
      require: false
   },
   price:{
      type: Number,
      require: false
   },
   isArchive:{
      type: Boolean,
      require: true
   },
   isDiscount:{
      type: Boolean,
      require: true
   },
   isCanceled:{
      type: Boolean,
      require: false
   },
   isCanceledText:{
      type: String,
      require: false
   },
   isCancel:{
      type: Boolean,
      require: true
   }
},{
   timestamps: true,
});

export default mongoose.model("Order",OrderSchema);