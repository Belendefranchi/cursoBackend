import cartModel from '../models/carts.model.js';

export default class CartManager {
    constructor() {
        console.log('Working carts with DB')
    }

    getAll = async () => {
        const carts = await cartModel.find().lean();
        return carts;
    }

    getAllPaginated = async (limit, page) => {
        const carts = await cartModel.paginate({}, { limit, page, lean: true });
        return carts;
    }

    getCartById = async (cartId) => {
        const cart = await cartModel.findOne({ _id: cartId });
        return cart;
    }

    save = async (newCart) => {
        const result = await cartModel.create(newCart);
        return result;
    }

    addProductToCart = async (cartId, productId, productQty) => {
        try {
            console.log(cartId);
            console.log(productId);
            console.log(productQty);

            const result = await cartModel.updateOne({ _id: cartId }, {
                products: [
                    {
                        product: productId,
                        quantity: productQty
                    }
                ]
            });
            return result;
        } catch (error) {
            console.log(error);
        }
    }
}