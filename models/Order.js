import mongoose, { Schema } from 'mongoose';

const OrderSchema = new mongoose.Schema({  
   category1:{
      type: mongoose.Schema.Types.ObjectId,      
      ref: 'Category',
   },
   category2:{
      type: String,
      required: true,
   },   
   category3:{
      type: String,
      required: true,
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
      ref: 'Score'
   },
   typeBuyer:{
      type: mongoose.Schema.Types.ObjectId,      
      ref: 'TypeBuyer'
   },
   isTender:{
      type: mongoose.Schema.Types.ObjectId,      
      ref: 'TypeOrder'
   },
   isImmediate:{
      type: mongoose.Schema.Types.ObjectId,      
      ref: 'IsImmediate'
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
   user:{
      type: mongoose.Schema.Types.ObjectId,      
      ref: 'User',
      require: false
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