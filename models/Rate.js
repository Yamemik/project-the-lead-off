import mongoose, { Schema } from 'mongoose';

const RateSchema = new mongoose.Schema({  
   score:{
      type: Array,
      require: true
   },
   type_buyer:{
      type: Array,
      require: true
   },
   type_order:{
      type: Array,
      require: true
   },
   is_urgent:{
      type: Array,
      require: true
   },
   is_express:{
      type: Array,
      require: true
   },
   count_region:{
      type: Array,
      require: true
   },
   is_open:{
      type: Array,
      require: true
   },
   is_sale:{
      type: Array,
      require: true
   }
},{
   timestamps: true,
});

export default mongoose.model("Rate",RateSchema);