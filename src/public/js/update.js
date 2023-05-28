const goBack = () => {
  window.location.href = '/api/products';
};

const updateProduct = () => {

  const id = document.getElementById('id').value;
  const title =  document.getElementById('title').value;
  const category = document.getElementById('category').value;
  const description = document.getElementById('description').value;
  const code = document.getElementById('code').value;
  const price = document.getElementById('price').value;
  const thumbnail = document.getElementById('thumbnail').value;
  const stock = document.getElementById('stock').value;
  const status = document.getElementById('status').value;

  console.log(id, title, category, description, code, price, thumbnail, stock, status);

  const url = `/api/products/update/${String(id)}`;

  console.log(url);


  fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, category, description, code, price, thumbnail, stock, status }),
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

const deleteProduct = () => {

  const id = document.getElementById('id').value;

  const url = `/api/products/update/${String(id)}`;

  console.log(id);

  fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  })
    .then(response => {
      if (response.ok) {
        console.log('Producto eliminado correctamente');
        window.location.href = '/api/products';
      } else {
        throw new Error('Error al eliminar el producto');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
};
