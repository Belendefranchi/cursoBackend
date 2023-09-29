import CartsDAO from '../dao/dbManagers/classes/carts.dao.js';

export default class CartsRepository {
  constructor() {
    this.dao = new CartsDAO();
  }

  getCarts = async () => {
    const result = await this.dao.getCarts();
    return result;
  }

  getCartById = async (cid) => {
    const result = await this.dao.getCartById(cid);
    return result;
  }

  createCart = async (cart) => {
    const result = await this.dao.createCart(cart);
    return result;
  }

  resolveCart = async (cid, cart) => {
    const result = await this.dao.resolveCart(cid, cart);
    return result;
  }
}