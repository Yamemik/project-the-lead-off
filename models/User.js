import mongoose, { Schema } from 'mongoose';

const UserSchema = new mongoose.Schema({  
   fio:{
      type: String,
      required: true
   },
   email:{
      type: String,
      required: true,
      unique: true      
   },
   telephone:{
      type: String,      
      require: true,
      unique: true
   },
   organization:{
      type: Boolean,
      require: true
   },
   region:{
      type: Array,
      require: false
   },
   business_line:{
      type: Array,
      require: false
   },
   access_to_open:{
      type: Boolean,
      require: false
   },
   isAdmin:{
      type: Boolean,
      require: true
   },
   balance:{
      type: Number,
      require: false
   },
   passwordHash:{
      type: String,
      require: true
   }
},{
   timestamps: true
});

export default mongoose.model("User",UserSchema);