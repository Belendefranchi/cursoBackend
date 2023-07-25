import express from 'express';
import session from 'express-session';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import mongoose from "mongoose";
import MongoStore from 'connect-mongo';
import passport from 'passport';
import __dirname from './utils.js';
import './dao/dbManagers/dbConfig.js';
import sessionsRouter from './routes/sessions.router.js'
import viewsRouter from "./routes/views.router.js";
import productsRouter from "./routes/products.router.js";
import productsFakerRouter from "./routes/productsFaker.router.js";
import cartsRouter from "./routes/carts.router.js";
import initializePassport from './config/passport.config.js';
import dotenv from 'dotenv';

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


dotenv.config();
const PORT = process.env.PORT;
//const MONGO_URL = process.env.MONGO_URL;
const SECRET = process.env.SECRET;

console.log('PORT', PORT);
//console.log('MONGO_URL', MONGO_URL);
console.log('SECRET', SECRET);


const result = dotenv.config();

if (result.error) {
    console.error('Error al cargar el archivo .env:', result.error);
}

/* const connectToDatabase = async () => {
    try {
        await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Base de datos conectada');
    } catch (error) {
        console.log(error);
    }
}

connectToDatabase(); */

app.use(session({
    store: MongoStore.create({
        client: mongoose.connection.getClient(),
        ttl: 3600
    }),
    secret: SECRET,
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
app.use('/products', productsRouter);
app.use('/carts', cartsRouter);
app.use('/mockingproducts', productsFakerRouter);


const server = app.listen(PORT, () => console.log ('Servidor escuchando en el puerto 8080'));

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

