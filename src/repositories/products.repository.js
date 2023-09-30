import ProductsDAO from '../dao/dbManagers/classes/products.dao.js';

export default class ProductsRepository {
  constructor() {
    this.dao = new ProductsDAO();
  }

  getProducts = async () => {
    const result = await this.dao.getProducts();
    return result;
  }

  getProductsPaginated = async (limit, page) => {
    const result = await this.dao.getProductsPaginated(limit, page);
    return result;
  }

  getProductById = async (pid) => {
    const result = await this.dao.getProductById(pid);
    return result;
  }

  createProduct = async (product) => {
    const result = await this.dao.createProduct(product);
    return result;
  }

  updateProduct = async (pid, product) => {
    const result = await this.dao.updateProduct(pid, product);
    return result;
  }
}