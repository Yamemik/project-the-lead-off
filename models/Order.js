import mongoose, { Schema } from 'mongoose';

const OrderSchema = new mongoose.Schema({  
   fio:{
      type: String,
      required: true
   },
   email:{
      type: String,
      required: true,
      unique: true      
   },
   passwordHash:{
      type: String,
      require: false
   },
   rate:{
      type: Array,      
      require: true
   },
   role:{
      type: mongoose.Schema.Types.ObjectId,      
      ref: 'Role',
      required: false
   },
   country:{
      type: String,
      require: false
   },
   city:{
      type: String,
      require: false
   },
   dateBirth:{
      type: String,
      require: false
   },
   gender:{
      type: String,
      require: false
   },
   mobile:{
      type: String,
      require: false
   }



},{
   timestamps: true,
});

export default mongoose.model("Order",OrderSchema);