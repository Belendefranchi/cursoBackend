import * as usersService from '../services/users.service.js';
import * as cartsService from '../services/carts.service.js';
import { NotFound, AlreadyExists } from "../utils/custom-exceptions.js";

const getCarts = async (req, res) => {
  try {
    const result = await cartsService.getCarts();
    res.sendSuccess({ result });
  } catch (error) {
    req.logger.error(error.message);

    if (error instanceof NotFound){
      return res.sendClientError('Cart Controller: Carts not found');
    }
    res.sendServerError(error.message);
  }
};

const getCartById = async (req, res) => {
  try {
    const { cid } = req.params.cid;
    const result = await cartsService.getCartById(cid);

    res.sendSuccess({ result });
  } catch (error) {
    req.logger.error(error.message);

    if (error instanceof NotFound){
      return res.sendClientError('Cart Controller: Cart not found');
    }
    res.sendServerError(error.message);
  }
};

const createCart = async (req, res) => {
  try {
    //{
    //  uid: 'id del usuario mongo db';
    //  products: [1, 2, 3]
    //}
    const { uid, products } = req.body;

    const userResult = await usersService.getUserById(uid);

    const result = await cartsService.createCart(userResult, products);

    res.sendSuccess({ result });
  } catch (error) {
    req.logger.error(error.message);

    if (error instanceof NotFound){
      return res.sendClientError('Cart Controller: User not found');
    }
    if (error instanceof AlreadyExists) {
      return res.sendClientError('Cart Controller: Cart already exists')
    }
    res.sendServerError(error.message);
  }
};

const resolveCart = async (req, res) => {
  try {
    const { status } = req.body;
    const { cid } = req.params;

    const cartResult = await cartsService.getCartById(cid);

    const result = await cartsService.resolveCart(cartResult, status);

    res.sendSuccess({ result });
  } catch (error) {
    req.logger.error(error.message);

    if (error instanceof NotFound){
      return res.sendClientError('Cart Controller: Cart not found');
    }
    res.sendServerError(error.message);
  }
};

export {
  getCarts,
  getCartById,
  createCart,
  resolveCart
};