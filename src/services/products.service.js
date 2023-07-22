import { PRODUCTSDAO } from '../dao/index.js';

const getProducts = async () => {
  const products = await PRODUCTSDAO.getAll();
  return products;
};

const saveProduct = async (product) => {
  await PRODUCTSDAO.save(product);
  return product;
};

export {
  getProducts,
  saveProduct
};
