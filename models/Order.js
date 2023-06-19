import mongoose, { Schema } from 'mongoose';

const OrderSchema = new mongoose.Schema({  
   nomeclature:{
      type: Array,
      required: true,
   },   
   region:{
      type: Array,
      required: true,
   },
   text:{
      type: String,      
      require: false
   },
   upload:{
      type: Array,
      require: false
   },
   email:{
      type: String,
      require: false
   },
   telephone:{
      type: Array,
      require: true
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
   is_express:{
      type: Boolean,
      require: true
   },
   price:{
      type: Number,
      default: 0
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
   date_buy:{
      type: Date,
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