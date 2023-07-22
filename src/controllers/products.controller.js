import {
  getProducts as getProductsService,
  saveProduct as saveProductService
} from '../services/products.service.js';

const getProducts = async (req, res) => {
  const products = await getProductsService();
  res.send({ status: 'success', products });
}

const saveProduct = async (req, res) => {
  const product = req.body;
  await saveProductService(product);
  res.send({ status: 'success', product });
}

export {
  getProducts,
  saveProduct
}