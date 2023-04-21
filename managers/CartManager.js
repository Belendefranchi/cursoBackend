import fs from 'fs';
import ProductManager from "../../managers/ProductManager.js";


const manager = new ProductManager('./files/Products.json');

export default class CartManager {
    constructor(path) {
        this.path = path;
    }

    getCart = async () => {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            console.log(data);
            const cart = JSON.parse(data);
            return cart;
        } else {
            return [];
        }
    };

    addProductToCart = async (cartId, productId) => {
        const productResult = await manager.getProducts();
        try{
            const product = productResult.find((product) => product.id === productId);
            if (!product) {
                console.log(`No existe el producto con id ${productId}`);
            }else{
                const carts = await this.getCart();
                const cart = carts.find((cart) => cart.id === cartId);
                if (!cart) {
                    console.log(`No existe el carrito con el id ${cartId}`);
                }else{
                    cart.push(product);
                }
            }
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));

            return cart;

        } catch (error) {
            console.log(error);
        }
    };

    updateCart = async (id, form) => {
        try{
            const carts = await this.getcarts();
            const cart = carts.find((cart) => cart.id === id);
            if (!cart) {
                console.log(`No existe el carto con el id ${id}`);
            }else{

            }
        } catch (error) {
            console.log(error);
        }
    };


    deleteCart = async () => {
        try{
        await fs.promises.unlink(this.path);
        } catch (error) {
            console.log(error);
        }
    };
}