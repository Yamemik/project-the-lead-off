import mongoose, { Schema } from 'mongoose';

const UserSchema = new mongoose.Schema({  
   fio:{
      type: String,
      required: false
   },
   email:{
      type: String,
      required: true,
      unique: true      
   },
   telephone:{
      type: Array,      
      require: false
   },
   organization:{
      type: Boolean,
      require: false
   },
   country:{
      type: String,
      require: false
   },
   city:{
      type: String,
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
   timestamps: true,
});

export default mongoose.model("User",UserSchema);