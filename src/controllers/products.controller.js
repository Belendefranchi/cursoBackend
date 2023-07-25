import {
  getProducts as getProductsService,
  getProductById as getProductByIdService,
  saveProduct as saveProductService,
  generateProductsFaker as generateProductsFakerService,
  updateProduct as updateProductService,
  deleteProduct as deleteProductService
} from '../services/products.service.js';

const getProducts = async (req, res) => {
  const products = await getProductsService();
  res.send({ status: 'success', products });
  //res.render('products', { products })
}

const getProductById = async (req, res) =>{
  const pid = req.params.pid
  console.log(`pid en controller: ${pid}`);
  await getProductByIdService(pid);
  res.send({ status: 'success', pid });
}

const saveProduct = async (req, res) => {
  const product = req.body;
  await saveProductService(product);
  res.send({ status: 'success', product });
}

const generateProductsFaker = async (req, res) => {
  let productsFaker = [];

  for(let i = 0; i < 50; i++) {
    productsFaker.push(generateProductsFakerService());
    //console.log(`Controller: ${JSON.stringify(productsFaker[i], null, 2)}`);
  }
  console.log("Controller: productos creados correctamente");
  res.send({ status: 'ok', count: productsFaker.length, data: productsFaker})
}

const updateProduct = async (req, res) => {

}

const deleteProduct = async (req, res) => {

}

export {
  getProducts,
  getProductById,
  saveProduct,
  generateProductsFaker,
  updateProduct,
  deleteProduct
}