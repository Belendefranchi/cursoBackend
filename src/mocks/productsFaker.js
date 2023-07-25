import { faker } from "@faker-js/faker";

faker.locale = "es";

let PastTests = 0;
const TotalTests = 50;

const productsFaker = (res, req) => {

  const product = {
    title: faker.commerce.productName(),
    category: faker.commerce.department(),
    description: faker.commerce.productDescription(),
    code: faker.random.alphaNumeric(8),
    price: faker.commerce.price(),
    thumbnail: faker.image.image(),
    stock: faker.random.numeric(1),
    status: faker.datatype.boolean(),
  };

  // 1. Verificar que se reciba un error en caso de que falten campos requeridos por especificar
  if (
    !product.title ||
    !product.category ||
    !product.description ||
    !product.code ||
    !product.price ||
    !product.thumbnail ||
    !product.stock
  ) {
    let missingProperties = [];

    if (!product.title) missingProperties.push("title");
    if (!product.category) missingProperties.push("category");
    if (!product.description) missingProperties.push("description");
    if (!product.code) missingProperties.push("code");
    if (!product.price) missingProperties.push("price");
    if (!product.thumbnail) missingProperties.push("thumbnail");
    if (!product.stock) missingProperties.push("stock");

    console.log(`Test 1: Incorrecto. Faltan las siguientes propiedades: ${missingProperties.join(", ")}`);

  } else {
    PastTests++;
    console.log("Test 1: Correcto");
    if (PastTests === TotalTests) {
      console.log('Pruebas pasadas exitosamente');
    } else {
      console.log(`Se pasaron ${PastTests} de un total de ${TotalTests} test totales`);
    }
  }
  return product;
};


export { productsFaker };
