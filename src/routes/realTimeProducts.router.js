import { Router } from 'express';
import ProductManager from "../../managers/ProductManager.js";

const router = Router();

const manager = new ProductManager('./files/Products.json');


router.get('/realtimeproducts', async (req, res) => {
    const productResult = await manager.getProducts();
    console.log(productResult);
    res.render('realTimeProducts', { productResult });
});