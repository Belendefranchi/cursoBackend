import { Router } from 'express';
import ProductManager from "../../src/dao/dbManagers/products.manager.js";


const router = Router();

const manager = new ProductManager();

router.get('/', async (req, res) => {

    const limit= req.query.limit;

    try {
        const products = await manager.getAll();
        if(limit){
            const result = products.slice(0, limit);
            console.log(result);
            res.render('products', { payload: result });
            //res.send({ status: 'success', payload: result });
        }else{
            const result = products;
            res.render('products', { payload: result });
            //res.send({ status: 'success', payload: result });
        }
    } catch (error) {
        console.log(error);
    }
});

router.get('/:pid', async (req, res) => {
    const pid = req.params.pid;
    try {
        const result = await manager.getProductsById(pid);
        console.log(result);
        res.render('productDetail', { payload: result });
        //res.send({ status: 'success', payload: result });
    } catch (error) {
        console.log(error);
    }
});

router.get('/update/:pid', async (req, res) => {

    const pid = req.params.pid;
    const result = await manager.getProductsById(pid);

    console.log(pid);
    console.log(result);

    try {
        res.render('update', { payload: result });
    } catch (error) {
        console.log(error);
    }
});

/* router.post('/', async (req, res) => {
    const products = await manager.insertMany();
    res.send({ status: 'success', product });
}); */

router.post('/', async (req, res) => {

    const { title, category, description, code, price, thumbnail, stock, status } = req.body

    const products = await manager.getAll();
    const codeExist = products.find((product) => product.code === code);

    if (codeExist) {
        console.log(`Ya existe un producto con el código: ${code}`);
    }else{
        if (!title || !category || !description || !code || !price || !thumbnail || !stock){
            console.log(`Debe completar todos los campos`);
            return res.status(400).send({ status: 'Error', error: 'Missing fields' })
        }else{
            try {
                const result = await manager.insertOne({
                    title,
                    category,
                    description,
                    code,
                    price,
                    thumbnail,
                    stock,
                    status
                });
                res.send({ status: 'Success', payload: result });
            } catch (error) {
                console.log(error);
                res.status(500).send({ status: 'Error', error })
            }
        }
    }
});

router.put('/update/:pid', async (req, res) => {

    const { pid } = req.params;
    console.log(pid);
    const { title, category, description, code, price, thumbnail, stock, status } = req.body;

    if(!title || !category || !description || !code || !price || !thumbnail || !stock || !status ){
        return res.status(400).send({ status: 'Error', error: 'Missing fields' })
    };

    try {
        const productToUpdate = await manager.updateOne(pid, {
            title,
            category,
            description,
            code,
            price,
            thumbnail,
            stock,
            status
        });
        res.send({ status: 'success', payload: productToUpdate });
    } catch (error) {
        console.log(error);
    };
});

router.delete('/update/:pid', async (req, res) => {

    const { pid } = req.params;

    const deleteProduct = await manager.deleteOne(pid);
    res.send({ status: 'success', payload: deleteProduct });

});

export default router;