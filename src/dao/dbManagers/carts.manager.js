import { cartModel } from '../../models/carts.model.js';

export default class CartManager {
    constructor() {
        console.log('Working carts with DB')
    }

    getCart = async () => {
        const carts = await cartModel.find().lean();
        return carts;
    }

    addProductToCart = async (cartId, productId) => {
        try{
            const product = productResult.find((product) => product.id === productId);
            if (!product) {
                console.log(`No existe el producto con id ${productId}`);
            }else{
            await cartModel.updateOne({ _id: id }, product);
            };
        }catch(error){
            console.log(error);
        };
    };

    save = async () => {

    }

    update = async (id, product) => {

    }
}