import { Router } from "express";
import CartManager from "../../src/dao/dbManagers/carts.manager.js";

const router = Router();

const manager = new CartManager();

/* const carts = []; */

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

export default router;
