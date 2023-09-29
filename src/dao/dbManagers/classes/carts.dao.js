import cartsModel from '../models/carts.model.js';

export default class ordersDAO {
  constructor() {
    console.log('Working users with DB')
  }

  getCarts = async () => {
    const result = await cartsModel.find().lean();
    return result;
  }

  getCartById = async (cid) => {
    const result = await cartsModel.findById(cid);
    return result;
  }

  createCart = async (cart) => {
    const result = await cartsModel.create(cart);
    return result;
  }

  resolveCart = async (cid, cart) => {
    const result = await cartsModel.findByIdAndUpdate(cid, cart);
    return result;
  }
}
