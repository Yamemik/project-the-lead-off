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
   rate:{
      type: Array,      
      require: true
   },
   role:{
      type: mongoose.Schema.Types.ObjectId,      
      ref: 'Role',
      required: true
   },
   country:{
      type: String,
      require: true
   },
   city:{
      type: String,
      require: true
   },
   dateBirth:{
      type: String,
      require: true
   },
   gender:{
      type: String,
      require: true
   },
   mobile:{
      type: String,
      require: true
   },
   passwordHash:{
      type: String,
      require: true
   }
},{
   timestamps: true,
});

export default mongoose.model("User",UserSchema);