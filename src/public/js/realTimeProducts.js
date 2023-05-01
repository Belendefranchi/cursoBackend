const socket = io();

socket.emit('message', 'Hola mundo desde el front end');

const container = document.getElementById('container');
const log = document.getElementById('log');

//segunda parte
/* input.addEventListener('keyup', evt => {
    const { key } = evt;
    evt.target.value = '';
    socket.emit('message1', key);
});

socket.on('log', data => {
    log.innerHTML+=data;
}); */


//tercera parte
/* input.addEventListener('keyup', evt => {
    if(evt.key === 'Enter'){
        socket.emit('message2', input.value);
        input.value='';
    }
});

socket.on('log', data => {
    let logs = '';

    data.logs.forEach(log => {
        logs += `${log.socketId} dice: ${log.message}<br>`;
    });

    log.innerHTML+=logs;
}); */

socket.on('message', data => {
    container.innerHTML = ``;

    data.forEach(prod => {
        container.innerHTML += `
            <ul>
                <li>title: ${prod.title}</li> 
                <li>description: ${prod.description}</li>
                <li>code: ${prod.code}</li>
                <li>price: ${prod.price}</li>
                <li>status: ${prod.status}</li>
                <li>stock: ${prod.stock}</li>
                <li>category: ${prod.category}</li>
                <li>id: ${prod.id}</li>
            </ul>
        `
    })
})