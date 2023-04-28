const socket = io();

socket.emit('message', 'Hola mundo desde el front end');

socket.on('evento_socket_individual', data => {
    console.log(data);
});

/* const userName = document.getElementById('name');
const userRole = document.getElementById('role'); */