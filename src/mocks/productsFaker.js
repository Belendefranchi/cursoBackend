import { faker } from '@faker-js/faker';

faker.locale = 'es';

const productsFaker = () => {
    return {
        title: faker.commerce.productName(),
        category: faker.commerce.department(),
        description: faker.commerce.productDescription(),
        code: faker.random.alphaNumeric(8),
        price: faker.commerce.price(),
        thumbnail: faker.image.image(),
        stock: faker.random.numeric(1),
        status: faker.datatype.boolean()
    };
}

export { productsFaker };