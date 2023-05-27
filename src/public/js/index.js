const socket = io();

socket.emit('message', 'Hola mundo desde el front end');

socket.on('evento_socket_individual', data => {
    console.log(data);
});
