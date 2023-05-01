import fs from 'fs';

export default class ProductManager {
    constructor(path) {
        this.path = path;
    }

    getProducts = async () => {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            console.log(data);
            const products = JSON.parse(data);
            return products;
        } else {
            return [];
        }
    };

    getProductsById = async (code) => {
        const products = await this.getProducts();
        const productById = products.find((product) => product.id === code);
        if (!productById) {
            return `No existe el producto con id ${code}`;
        }else{
        return productById;
        } 
    };

    addProduct = async (product, id) => {
        try{
            const products = await this.getProducts();

            const codeExist = products.find((product) => product.id === id);

            if (codeExist) {
                console.log(`Ya existe un producto con el id ${id}`);
            }else{
                if (products.length === 0) {
                    product.id = 1;
                }else{
                    product.id = products[products.length - 1].id + 1;
                }
                if (!product.title || !product.category || !product.description || !product.code || !product.price || !product.thumbnail || !product.stock){
                    console.log(`Debe completar todos los campos`);
                }else{
                    products.push(product);
                }
            }
            
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));

            return product;

        } catch (error) {
            console.log(error);
        }
    }

    updateProduct = async (id, form) => {
        try{
            const products = await this.getProducts();
            const product = products.find((product) => product.id === id);
            if (!product) {
                console.log(`No existe el producto con el id ${id}`);
            }else{

            }
        } catch (error) {
            console.log(error);
        }
    }


    deleteProduct = async () => {
        try{
        await fs.promises.unlink(this.path);
        } catch (error) {
            console.log(error);
        }
    }
}