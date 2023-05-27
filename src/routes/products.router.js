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
            res.render('home', { result });
            //res.send({ status: 'success', payload: result });
        }else{
            const result = products;
            res.render('home', { result });
            //res.send({ status: 'success', payload: productResult });
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
        res.render('home', { result });
        //res.send(result);
    } catch (error) {
        console.log(error);
    }
});

/* router.post('/', async (req, res) => {
    //const form = req.body

    const products = [
        {
            title: "Producto de prueba",
            category: "Prueba",
            description: "Descripción de prueba",
            code: "abc123",
            price: "1000",
            thumbnail: "Ruta de imagen",
            stock: "10",
            status: "true",
            id: 1
        },
        {
            title: "Producto de prueba",
            category: "Prueba",
            description: "Descripción de prueba",
            code: "abc123",
            price: "1000",
            thumbnail: "Ruta de imagen",
            stock: "10",
            status: "true",
            id: 2
        },
        {
            title: "Producto de prueba",
            category: "Prueba",
            description: "Descripción de prueba",
            code: "abc123",
            price: "1000",
            thumbnail: "Ruta de imagen",
            stock: "10",
            status: "true",
            id: 3
        },
        {
            title: "Producto de prueba",
            category: "Prueba",
            description: "Descripción de prueba",
            code: "abc123",
            price: "1000",
            thumbnail: "Ruta de imagen",
            stock: "10",
            status: "true",
            id: 4
        },
        {
            title: "Producto de prueba",
            category: "Prueba",
            description: "Descripción de prueba",
            code: "abc123",
            price: "1000",
            thumbnail: "Ruta de imagen",
            stock: "10",
            status: "true",
            id: 5
        },
        {
            title: "Producto de prueba",
            category: "Prueba",
            description: "Descripción de prueba",
            code: "abc123",
            price: "1000",
            thumbnail: "Ruta de imagen",
            stock: "10",
            status: "true",
            id: 6
        },
        {
            title: "Producto de prueba",
            category: "Prueba",
            description: "Descripción de prueba",
            code: "abc123",
            price: "1000",
            thumbnail: "Ruta de imagen",
            stock: "10",
            status: "true",
            id: 7
        },
        {
            title: "Producto de prueba",
            category: "Prueba",
            description: "Descripción de prueba",
            code: "abc123",
            price: "1000",
            thumbnail: "Ruta de imagen",
            stock: "10",
            status: "true",
            id: 8
        },
        {
            title: "1",
            category: "1",
            description: "1",
            code: "1",
            price: "1",
            thumbnail: "1",
            stock: "1",
            status: "true",
            id: 9
        }
    ]

    const product = await manager.insertMany(products);
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

/* router.put('/:pid', async (req, res) => {
    const form = req.body
    const product = await manager.updateProduct(Number(req.params.pid), form);
    res.send({ status: 'success', product });
}); */

/* router.delete('/', (req, res) => {
    const del = async () => {
        await manager.deleteProduct();
    };
    setTimeout(() => {
    del();
}, 5000);
    res.send("Se eliminó el archivo");
}); */


export default router;