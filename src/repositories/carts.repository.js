import CartsDAO from '../dao/classes/carts.dao.js';

export default class CartsRepository {
  constructor() {
    this.dao = new CartsDAO();
  }

  getCarts = async () => {
    const result = await this.dao.getCarts();
    return result;
  }

  getCartById = async (id) => {
    const result = await this.dao.getCartById(id);
    return result;
  }

  createCart = async (order) => {
    const result = await this.dao.createCart(order);
    return result;
  }

  resolveCart = async (id, order) => {
    const result = await this.dao.resolveCart(id, order);
    return result;
  }
}