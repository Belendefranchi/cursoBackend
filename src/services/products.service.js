import ProductsRepository from '../repositories/products.repository.js';
//import { productsFaker } from "../mocks/productsFaker.js";

const productsRepository = new ProductsRepository();

const getProducts = async () => {
  const products = await productsRepository.getProducts();
  return products;
};

const getProductsPaginated = async (limit, page) => {
  const products = await productsRepository.getProductsPaginated(limit, page);
  return products;
};

const getProductById = async (id) => {
  const product = await productsRepository.getProductById(id);
  return product;
};

const createProduct = async (product) => {
  const result = await productsRepository.createProduct(product);
  return result;
};

/* const generateProductsFaker = () => {
  const products = productsFaker();
  return products;
}; */

const updateProduct = async (product, id) => {
  product.products.push(id);
  const result = await productsRepository.updateProduct(product);
  return result;
};

const deleteProduct = async (id) => {
  const result = await productsRepository.deleteProduct(id);
  return result;
};

export {
  getProducts,
  getProductsPaginated,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
