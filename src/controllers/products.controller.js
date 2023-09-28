import * as productsService from '../services/products.service.js';
import {  NotFound, AlreadyExists } from "../utils/custom-exceptions.js";

const getProducts = async (req, res) => {
  try {
    const result = await productsService.getProducts();
    //res.sendSuccess({ result });
    res.render('products', { result })
  } catch (error) {
    req.logger.error(error.message);
    if (error instanceof NotFound){
      return res.sendClientError('Product Controller: Products not found');
    }
    res.sendServerError(error.message);
  }
}

const getProductsPaginated =async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const result = await productsService.getProductsPaginated(limit, page);
    res.sendSuccess({ result });
} catch (error) {
  req.logger.error(error.message);
  if (error instanceof NotFound){
    return res.sendClientError('Product Controller: Products not found');
  }
    res.sendServerError(error.message);
}
}

const getProductById = async (req, res) =>{
  try {
    const { pid } = req.params.pid
    console.log(`pid en products Product controller: ${pid}`);
    const result = await productsService.getProductById(pid);
    res.sendSuccess({ result });
  } catch (error) {
    req.logger.error(error.message);
    if (error instanceof NotFound){
      return res.sendClientError('Controller: Product not found');
    }
    res.sendServerError(error.message);
  }
}

const createProduct = async (req, res) => {
  try {
    const product = req.body;
    const result = await productsService.createProduct(product);
    res.sendSuccess({ result });
  } catch (error) {
    req.logger.error(error.message);
    if (error instanceof AlreadyExists){
      return res.sendClientError('Product Controller: Product already exists');
    }
    res.sendServerError(error.message);
  }
}

const addProduct = async (req, res) => {
  try {
    const product = req.body;
    const result = await productsService.getProductById(req.params.id);

    const updateResult = await productsService.updateProduct(result, product);
    res.sendSuccess({ updateResult });
  } catch (error) {
    req.logger.error(error.message);
    if (error instanceof NotFound){
      return res.sendClientError('Controller: Product not found');
    }
    res.sendServerError(error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = req.body;
    const result = await productsService.getProductById(req.params.id);

    const updateResult = await productsService.deleteProduct(result, product);
    res.sendSuccess({ updateResult });
  } catch (error) {
    req.logger.error(error.message);
    if (error instanceof NotFound){
      return res.sendClientError('Controller: Product not found');
    }
    res.sendServerError(error.message);
  }
}
/* const generateProductsFaker = async (req, res) => {
  let productsFaker = [];

  for(let i = 0; i < 50; i++) {
    productsFaker.push(generateProductsFakerService());
    //console.log(`Product Controller: ${JSON.stringify(productsFaker[i], null, 2)}`);
  }
  console.log("Product Controller: productos creados correctamente");
  res.send({ status: 'ok', count: productsFaker.length, data: productsFaker})
} */

export {
  getProducts,
  getProductsPaginated,
  getProductById,
  createProduct,
  addProduct,
  deleteProduct
}