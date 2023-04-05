import ProductManager from "./managers/ProductManager.js";


const manager = new ProductManager('./files/Products.json');

const env = async () => {
    const products = await manager.getProducts();
    console.log(products);

    const product = {
        title: 'Producto prueba',
        description: 'Este es un producto prueba',
        price: 200,
        thumbnail: 'Sin imagen',
        stock: 25
    };

    await manager.addProduct(product);

    const productResult = await manager.getProducts();
    console.log(productResult);
}

const del = async () => {
    await manager.deleteProduct();
}

env();

setTimeout(() => {
    del();
    console.log("Se eliminó el archivo")
}, 10000);