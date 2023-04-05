import fs from 'fs';

export default class ProductManager {
    constructor(path) {
        /* this.products = []; */
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

    getProductsById = (code) => {
        const productById = this.products.find((product) => product.code === code);
        if (!productById) {
            return `No existe el producto con id ${code}`;
        }else{
        return productById;
        } 
    };

    addProduct = async (product) => {
        try{
            const products = await this.getProducts();

            const codeExist = products.find((product) => product.code === code);

            if (codeExist) {
                console.log(`Ya existe un producto con el id ${code}`);
            }else{
                if (products.length === 0) {
                    product.code = 1;
                    await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
                    return product;
                }else{
                    product.code = products[products.length - 1].code + 1;
                }
                if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock){
                    console.log(`Debe completar todos los campos`);
                }else{
                    await fs.promises.appendFile(this.path, JSON.stringify(products));
                    /* products.push(product); */
                    return product;
                }
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
