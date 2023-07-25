import { PRODUCTSDAO } from '../dao/index.js';
import { productsFaker } from "../mocks/productsFaker.js";


const getProducts = async () => {
  const products = await PRODUCTSDAO.getAll();
  return products;
};

const getProductById = async (_id) => {
  const product = await PRODUCTSDAO.getById(_id);
  return product;
};

const saveProduct = async (product) => {
  await PRODUCTSDAO.save(product);
  return product;
};

const generateProductsFaker = () => {
  const products = productsFaker();
  console.log(`Service: ${products}`);
  return products;
};

const updateProduct = async (id, product) => {
  await PRODUCTSDAO.updateOne(id, product);
  return product;
};

const deleteProduct = async (id) => {
  await PRODUCTSDAO.deleteOne(id);
  return id;
};

export {
  getProducts,
  getProductById,
  saveProduct,
  generateProductsFaker,
  updateProduct,
  deleteProduct
};
