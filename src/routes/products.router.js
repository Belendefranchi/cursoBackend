import { Router } from 'express';
import ProductManager from "../../managers/ProductManager.js";


const router = Router();

const manager = new ProductManager('./files/Products.json');

router.get('/', async (req, res) => {

    const limit= req.query.limit;
    
    const productResult = await manager.getProducts();
    if(limit){
        res.send(productResult.slice(0, limit));
    }else{	
        res.send(productResult);
    }
});

router.get('/:pid', async (req, res) => {
    const productResult = await manager.getProductsById(Number(req.params.pid));
    res.send(productResult);
});


router.post('/', async (req, res) => {
    const form = req.body
    const product = await manager.addProduct(form);
    res.send({ status: 'success', product });
});

router.put('/:pid', async (req, res) => {
    const form = req.body
    const product = await manager.updateProduct(Number(req.params.pid), form);
    res.send({ status: 'success', product });
});

router.delete('/', (req, res) => {
    const del = async () => {
        await manager.deleteProduct();
    };
    setTimeout(() => {
    del();
}, 5000);
    res.send("Se eliminó el archivo");
});



export default router;