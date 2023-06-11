import express from 'express';
import session from 'express-session';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import mongoose from "mongoose";
import MongoStore from 'connect-mongo';
import passport from 'passport';
import __dirname from './utils.js';
import sessionsRouter from './routes/sessions.router.js'
import viewsRouter from "./routes/views.router.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import initializePassport from './config/passport.config.js';

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

try {
    await mongoose.connect('mongodb+srv://belendefranchi:yAZg4NDFZWERHnk9@cluster39760bdf.tv4a6we.mongodb.net/?retryWrites=true&w=majority');
    console.log('Base de datos conectada');

} catch (error) {
    console.log(error);
}

app.use(session({
    store: MongoStore.create({
        client: mongoose.connection.getClient(),
        ttl: 3600
    }),
    secret: 'Coder39760',
    resave: true,
    saveUninitialized: true
}));

//PASSPORT
initializePassport();
app.use(passport.initialize());
app.use(passport.session());


app.use('/', viewsRouter);
app.use('/api/sessions', sessionsRouter);
//app.use('/realtimeproducts', realTimeProductsRouter);
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

