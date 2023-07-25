import { productModel } from "./models/products.model.js";

export default class ProductsDAO {
  constructor() {}

  async getAll() {
    return await productModel.find().lean();
  }

  async getById(_id) {
    console.log(`pid en dao: ${_id}`);
    const products = await productModel.find().lean();
    let productById = products.find((product) => product._id.toString() === _id.toString());
    if (!productById) {
      return `No existe el producto con id ${_id}`;
    }else{
        return productById;
    }
  }

  async save(product) {
    return await productModel.create(product);
  }

  async updateOne (id, product) {
      await productModel.updateOne({ _id: id }, product);
  }

  async deleteOne (id) {
      await productModel.deleteOne({ _id: id });
  }
}