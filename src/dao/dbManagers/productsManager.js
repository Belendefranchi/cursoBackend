import { productModel } from '../models/products.models.js';

export default class products {
    constructor() {
        console.log('Working products with DB')
    }

    getAll = async () => {

    }

    save = async () => {

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

        //Insertar datos en la coleccion
        await productModel.insertMany(products);
    }

    update = async (id, product) => {

    }
}