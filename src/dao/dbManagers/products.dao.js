import { productModel } from "./models/products.model.js";

export default class ProductsDAO {
  constructor() {}

  async getAll() {
    return await productModel.find();
  }

  async save(product) {
    return await productModel.create(product);
  }
}