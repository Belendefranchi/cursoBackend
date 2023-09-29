import CartsRepository from '../repositories/carts.repository.js';
import UsersRepository from '../repositories/users.repository.js';

const cartsRepository = new CartsRepository();
const usersRepository = new UsersRepository();

const getCarts = async () => {
  const result = await cartsRepository.getCarts();
  return result;
}

const getCartById = async (cid) => {
  const result = await cartsRepository.getCartById(cid);
  return result;
}

const createCart = async (uid, cid, products) => {
/*   {
    number: '1234567890',
    cid,
    uid,
    status: 'pending',
    products: [1,2,3],
    totalPrice: 50
  } */

  const currentProducts = cid.products.filter(product =>
    products.includes(product.id)
  );

  const sum = currentProducts.reduce((acc, prev) => {
    acc += prev.price;
    return acc;
  }, 0);

  const cartNumber = Date.now() + Math.floor(Math.random() * 10000 + 1);

  const cart = {
    number: cartNumber,
    business: cart._id,
    user: user._id,
    status: 'pending',
    products: currentProducts.map(product => product.id),
    total_price: sum
  };

  const cartResult = await cartsRepository.createCart(cart);

  uid.carts.push(cartResult._id);

  await usersRepository.updateUser(user._id, uid);

  return cartResult;
}

const resolveCart = async (cid, status) => {
  cid.status = status;
  await cartsRepository.resolveCart(cid);
  return cid;
}

export {
  getCarts,
  getCartById,
  createCart,
  resolveCart
}

