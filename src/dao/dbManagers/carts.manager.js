import { cartModel } from '../models/carts.model.js';

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
        const cart = await cartModel.findOne(cartId);
        return cart.toObject();
    }

    save = async (productId, productQty) => {
        const newCart = {
            product: productId,
            quantity: productQty
        };
        const result = await cartModel.create(newCart);
        return result;
    }

    addProductToCart = async (productId) => {
        const carts = this.getCart();
        console.log(carts);
        if(!carts){
            this.save(productId)
        }else{
            await cartModel.updateOne(productId);
        };

/*         try{
            const product = productResult.find((product) => product.id === productId);
            if (!product) {
                console.log(`No existe el producto con id ${productId}`);
            }else{
            await cartModel.updateOne({ _id: id }, product);
            };
        }catch(error){
            console.log(error);
        }; */
    }

    update = async (id, product) => {

    }

    updateById = async (id, cart) => {
        const result = await cartModel.updateOne({_id: id}, cart);
        return result;
    }

}