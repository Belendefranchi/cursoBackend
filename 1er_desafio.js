class ProductManager {
    constructor() {
        this.products = [];
    }

    getProducts = () => {
        return this.products;
    };

    getProductsById = (code) => {
        const productById = this.products.find((product) => product.code === code);
        if (!productById) {
            return `No existe el producto con id ${code}`;
        }else{
        return productById;
        } 
    };

    addProduct = (title, description, price, thumbnail, code, stock) => {
        const product ={
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };

        const codeExist = this.products.find((product) => product.code === code);

        if (codeExist) {
            console.log(`Ya existe un producto con el id ${code}`);
        }else{
            if (this.products.length === 0) {
                product.code = 1;
            }else{
                product.code = this.products[this.products.length - 1].code + 1;
            }
            if (!title || !description || !price || !thumbnail || !code || !stock){
                console.log(`Debe completar todos los campos`);
            }else{
                this.products.push(product);
            }
        }
    }
}

const manejadorProducts = new ProductManager();

manejadorProducts.addProduct('Remera', 'Remera de algodon', 1000, 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.tiendamia.com%2Fproducto%2Fremera-estampada-para-mujer-100-algodon-100-or', 1, 10);
manejadorProducts.addProduct('Remera', 'Remera de algodon', 1000, 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.tiendamia.com%2Fproducto%2Fremera-estampada-para-mujer-100-algodon-100-or', 1, 10);
manejadorProducts.addProduct('Remera', 'Remera de algodon', 1000, 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.tiendamia.com%2Fproducto%2Fremera-estampada-para-mujer-100-algodon-100-or', 2, 10);
manejadorProducts.addProduct('Remera', 'Remera de algodon', 1000, 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.tiendamia.com%2Fproducto%2Fremera-estampada-para-mujer-100-algodon-100-or', 3);


console.log(manejadorProducts.getProducts());
console.log(manejadorProducts.getProductsById(1));
console.log(manejadorProducts.getProductsById(2));
console.log(manejadorProducts.getProductsById(3));

