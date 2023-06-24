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
      type: String,
      require: false
   },
   typeBuyer:{
      type: String,
      require: true
   },
   isTender:{
      type: String,
      require: true
   },
   isImmediate:{
      type: Boolean,
      require: true,
   },
   isOpen:{
      type: Boolean,
      require: false
   },
   is_express:{
      type: Boolean,
      require: true,
      default: true
   },
   price:{
      type: Number,
      default: 0
   },
   isArchive:{
      type: Boolean,
      require: true,
      default: false
   },
   isDiscount:{
      type: Boolean,
      require: true,
      defalt: false
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
   isBuy:{
      type: Boolean,
      require: false,
      default: false
   },
   isCanceled:{
      type: Boolean,
      require: false,
      default: false
   },
   isCanceledText:{
      type: String,
      require: false
   },
   isCancel:{
      type: Boolean,
      require: true,
      defalt: false
   }
},{
   timestamps: true,
});

export default mongoose.model("Order",OrderSchema);