const updateCart = () => {

  const cartId = document.getElementById('cid').value;
  const productId = document.getElementById('pid').value;
  const productQty = document.getElementById('quantity').value;

  console.log(`cartId: ${cartId}`);
  console.log(`productId: ${productId}`);
  console.log(`productQty: ${productQty}`);

  const url = `/api/carts/${String(cartId)}/products/${String(productId)}`;

  console.log(url);

  fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cartId, productId, productQty }),
  })
  .then(response => {
      if (response.ok) {
        console.log('Datos actualizados correctamente');
      } else {
        throw new Error('Error al actualizar los datos');
      }
  })
  .catch(error => {
      console.error('Error:', error);
  });
};