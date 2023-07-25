import { Router } from "express";
//import { generateProductsFaker } from "../mocks/productsFaker.js";
import { generateProductsFaker } from "../controllers/products.controller.js";


const router = Router();

router.get("/", generateProductsFaker);

/* router.get("/", (req, res) => {
  let productsFaker = [];
  for(let i=0; i<50; i++) {
    productsFaker.push(generateProductsFaker());
    console.log(productsFaker[i]);
  }
  res.send({ status: 'ok', count: productsFaker.length, data: productsFaker})
}); */

export default router;