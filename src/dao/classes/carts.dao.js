import cartsModel from '../models/carts.model.js';

export default class ordersDAO {
  getCarts = async () => {
    const result = await cartsModel.find();
    return result;
  };

  getCartById = async (cid) => {
    const result = await cartsModel.findById(cid);
    return result;
  };

  createCart = async (carts) => {
    const result = await cartsModel.create(carts);
    return result;
  };

  resolveCart = async (cid, carts) => {
    const result = await cartsModel.findByIdAndUpdate(cid, carts);
    return result;
  };
}
