import mongoose, { Schema } from 'mongoose';

const OrderSchema = new mongoose.Schema({
   nomeclature: {
      type: Array,
      required: true,
   },
   region: {
      type: Array,
      required: true,
   },
   text: {
      type: String,
      require: false
   },
   upload: {
      type: Array,
      require: false
   },
   email: {
      type: String,
      require: false
   },
   telephone: {
      type: Array,
      require: true
   },
   fio: {
      type: String,
      require: false
   },
   score: {
      type: String,
      require: false
   },
   type_buyer: {
      type: String,
      require: true
   },
   type_order: {
      type: String,
      require: true
   },
   is_urgent: {
      type: String,
      require: true,
   },
   is_open: {
      type: String,
      require: false
   },
   is_express: {
      type: Boolean,
      require: true,
      default: true
   },
   price: {
      type: Number,
      default: 0
   },
   is_archive: {
      type: Boolean,
      require: true,
      default: false
   },
   is_sale: {
      type: Boolean,
      require: true,
      defalt: false
   },
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: false
   },
   date_buy: {
      type: Date,
      require: false
   },
   is_buy: {
      type: Boolean,
      require: false,
      default: false
   },
   is_canceled: {
      type: Boolean,
      require: false,
      default: false
   },
   is_canceled_text: {
      type: String,
      require: false
   },
   is_cancel: {
      type: Boolean,
      require: true,
      defalt: false
   }
}, {
   timestamps: true,
});

export default mongoose.model("Order", OrderSchema);