import { Router } from 'express';
import CartManager from "../../src/dao/dbManagers/carts.manager.js";
import { cartModel } from '../dao/models/carts.model.js';


const router = Router();

const manager = new CartManager();

/* const carts = []; */

router.get('/', async (req, res) => {
    try {
        const carts = await manager.getAll();
        console.log(carts);
        console.log(carts._id);
        res.send({ status: 'success', cart: carts });
    } catch (error) {
        res.send({ status: 'error', message: 'Carrito no encontrado' });
    }
});

router.post('/product/:pid', async(req, res) => {

    const productId = req.params.pid
    const productQty = req.body.quantity
    console.log(productId, productQty);

    const resultCart = await manager.save(productId, productQty);
    console.log(resultCart);
    res.send ({ status: 'success', resultCart });
});

/* router.post('/:cid/product/:pid', async (req, res) => {
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


export default router;