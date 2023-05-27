import { productModel } from '../../models/products.model.js';

export default class productManager {
    constructor() {
        console.log('Working products with DB')
    }

    getAll = async () => {
        const products = await productModel.find().lean();
        return products;
    }

    getProductsById = async (_id) => {
        const products = await productModel.find().lean();
        let productById = products.find((product) => product._id.toString() === _id.toString());
        if (!productById) {
            return `No existe el producto con id ${_id}`;
        }else{
            return productById;
        }
    };

    insertMany = async () => {

        const products = [
            {
                title: "Producto de prueba",
                category: "Prueba",
                description: "Descripción de prueba",
                code: "abc123",
                price: "1000",
                thumbnail: "Ruta de imagen",
                stock: "10",
                status: "true"
            },
            {
                title: "Producto de prueba",
                category: "Prueba",
                description: "Descripción de prueba",
                code: "abc123",
                price: "1000",
                thumbnail: "Ruta de imagen",
                stock: "10",
                status: "true"
            },
            {
                title: "Producto de prueba",
                category: "Prueba",
                description: "Descripción de prueba",
                code: "abc123",
                price: "1000",
                thumbnail: "Ruta de imagen",
                stock: "10",
                status: "true"
            },
            {
                title: "Producto de prueba",
                category: "Prueba",
                description: "Descripción de prueba",
                code: "abc123",
                price: "1000",
                thumbnail: "Ruta de imagen",
                stock: "10",
                status: "true"
            },
            {
                title: "Producto de prueba",
                category: "Prueba",
                description: "Descripción de prueba",
                code: "abc123",
                price: "1000",
                thumbnail: "Ruta de imagen",
                stock: "10",
                status: "true"
            },
            {
                title: "Producto de prueba",
                category: "Prueba",
                description: "Descripción de prueba",
                code: "abc123",
                price: "1000",
                thumbnail: "Ruta de imagen",
                stock: "10",
                status: "true"
            },
            {
                title: "Producto de prueba",
                category: "Prueba",
                description: "Descripción de prueba",
                code: "abc123",
                price: "1000",
                thumbnail: "Ruta de imagen",
                stock: "10",
                status: "true"
            },
            {
                title: "Producto de prueba",
                category: "Prueba",
                description: "Descripción de prueba",
                code: "abc123",
                price: "1000",
                thumbnail: "Ruta de imagen",
                stock: "10",
                status: "true"
            },
            {
                title: "1",
                category: "1",
                description: "1",
                code: "1",
                price: "1",
                thumbnail: "1",
                stock: "1",
                status: "true"
            }
        ]

        await productModel.insertMany(products);
    }

    insertOne = async (product) => {
        await productModel.create(product);
    }

    update = async (id, product) => {

    }
}