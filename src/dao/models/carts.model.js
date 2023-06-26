import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';


const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
    user: {
        type: Array,
        default: []
    },
    products: [
        {
            product: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        }
    ]
});

cartSchema.plugin(mongoosePaginate);

cartSchema.pre('find', function() {
    this.populate('products.product');
});


const cartModel = mongoose.model(cartCollection, cartSchema);

export default cartModel;