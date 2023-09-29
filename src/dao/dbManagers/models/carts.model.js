import mongoose from 'mongoose';

const cartsCollection = 'carts';

const cartSchema = new mongoose.Schema({
  number: Number,
  users:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  products: [],
  total_price: Number,
  status: String,
});

cartSchema.pre('find', function () {
  this.populate('carts');
});

const cartModel = mongoose.model(cartsCollection, cartSchema);

export default cartModel;