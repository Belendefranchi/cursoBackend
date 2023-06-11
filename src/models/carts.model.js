import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';


const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
    product: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    }
});

cartSchema.plugin(mongoosePaginate);

export const cartModel = mongoose.model(cartCollection, cartSchema);