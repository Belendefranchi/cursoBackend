import { Router } from 'express';
import CartManager from "../../managers/CartManager.js";
import ProductManager from "../../managers/ProductManager.js";

const router = Router();

const manager = new CartManager('./files/Carts.json');
const productManager = new ProductManager('./files/Products.json');


/* const carts = []; */

router.get('/', async (req, res) => {
    const cartResult = await manager.getCarts();
    res.send({ status: 'success', cartResult });
});

/* router.post('/:ci/product/:pid', async (req, res) => {
    const product = await productManager.getProductsById(Number(req.params.pid));
    if (!product) {
        res.send({ status: 'error', message: 'Producto no encontrado' });
        return;
    }else{
        const cartId = Number(req.params.ci);
        const productId = Number(req.params.pid);
        const cart = await CartManager.addProductToCart(cartId, productId);
        res.send({ status: 'success', cart });
    }
}); */

router.post('/save', async(req, res) => {
    const cart = {
        products: []
    };
    const resultCart = await manager.saveCart(cart);
    res.send ({ status: 'success', resultCart });
});


export default router;