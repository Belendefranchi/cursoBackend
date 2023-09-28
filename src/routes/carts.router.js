import Router from './router.js';
import { passportStrategiesEnum } from '../config/enums.js';
import { getCarts, getCartById, createCart, resolveCart } from '../controllers/carts.controller.js'

const router = Router();

export default class CartsRouter extends Router {
  init() {
    this.get('/', ['ADMIN'], passportStrategiesEnum.JWT, getCarts);
    this.get('/:id', ['ADMIN'], passportStrategiesEnum.JWT, getCartById);
    this.post('/', ['ADMIN'], passportStrategiesEnum.JWT, createCart);
    this.put('/:id', ['ADMIN'], passportStrategiesEnum.JWT, resolveCart);
  }
}

router.get("/", async (req, res) => {
  try {
    const carts = await manager.getAll();
    console.log(carts);
    res.send({ status: "carts get: success", cart: carts });
  } catch (error) {
    res.send({ status: "carts get: error", message: "Carrito no encontrado" });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    console.log(`cartId: ${cartId}`);
    const cart = await manager.getCartById(cartId);
    console.log(cart);
    res.send({ status: "carts get: success", cart: cart });
  } catch (error) {
    res.send({ status: "carts get: error", message: "Carrito no encontrado" });
  }
});

router.post("/:cid/products/:pid", async (req, res) => {
  try {
    const cid = req.session.user.cartId;

    console.log(`cid: ${cid}`);

    const cartId = req.params.cid;
    const productId = req.params.pid;
    const productQty = req.body.quantity;

    console.log(`cartId: ${cartId}`);
    console.log(`productId: ${productId}`);
    console.log(`productQty: ${productQty}`);

    const resultCart = await manager.addProductToCart({
      cartId,
      productId,
      productQty,
    });
    console.log(resultCart);

    res.send({ status: "carts post: success", resultCart });
  } catch (error) {
    res.send({ status: "carts post: error", error: error });
  }
});

//export default router;
