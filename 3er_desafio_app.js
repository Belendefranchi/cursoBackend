import express from 'express';
import ProductManager from "./managers/ProductManager.js";

const app = express();

const manager = new ProductManager('./files/Products.json');

app.get('/products', async (req, res) => {

    const limit= req.query.limit;
    
    const productResult = await manager.getProducts();
    if(limit){
        res.send(productResult.slice(0, limit));
    }else{	
        res.send(productResult);
    }
});

app.get('/products/add', async (req, res) => {
    const product = { 
        title: 'Producto prueba', 
        description: 'Este es un producto prueba', 
        price: 200, 
        thumbnail: 'Sin imagen',
        stock: 25 
    };
    await manager.addProduct(product);
    res.send(product);
});

app.get('/products/del', async (req, res) => {
    const del = async () => {
        await manager.deleteProduct();
    };
    setTimeout(() => {
    del();
}, 5000);
    res.send("Se eliminó el archivo");
});

app.get('/products/:pid', async (req, res) => {
    const productResult = await manager.getProductsById(Number(req.params.pid));
    res.send(productResult);
});


app.listen(8080, () => console.log ('Servidor escuchando en el puerto 8080'));
