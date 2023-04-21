import { Router } from 'express';

const router = Router();

const carts = [];

router.get('/', (req, res) => {
    res.send({ carts });
});

router.post('/:ci/product/:pid', async (req, res) => {
    const cartId = Number(req.params.ci);
    const productId = Number(req.params.pid);
    const cart = await CartManager.addProductToCart(cartId, productId);
    res.send({ status: 'success', cart });
});


export default router;