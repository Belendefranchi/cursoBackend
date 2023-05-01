import express from 'express';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import viewsRouter from "./routes/views.router.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import __dirname from './utils.js';


const app = express();

//const manager = new ProductManager('./files/Products.json');

// para agregar funcionalidad de json
app.use(express.json());

// para agregar funcionalidad de url params
app.use(express.urlencoded({ extended: true }));

// para agregar funcionalidad de archivos estáticos
app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');


app.use('/', viewsRouter);
app.use('/realtimeproducts', viewsRouter);
app.use('/home', productsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


const server = app.listen(8080, () => console.log ('Servidor escuchando en el puerto 8080'));

const io = new Server(server);

const logs = [];

io.on('connection', socket => {
    console.log('Nuevo cliente conectado!');
    socket.on('message1', data => {
        io.emit('log', data);
    });

    socket.on('message2', data => {
        logs.push({ socketId: socket.id, message: data });
        io.emit('log', { logs });
    });

    socket.emit('evento_socket_individual', 'Este mensaje solo debe recibir el socket')
});

