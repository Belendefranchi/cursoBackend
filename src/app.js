import express from 'express';
import config from './config/config.js';
import './dao/dbManagers/dbConfig.js';
import { __dirname, __mainDirname, addLogger } from "./utils/utils.js";
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import ViewsRouter from "./routes/views.router.js";
import UsersRouter from './routes/users.router.js'
import ProductsRouter from "./routes/products.router.js";
import CartsRouter from "./routes/carts.router.js";
//import productsFakerRouter from "./routes/productsFaker.router.js";
import initializePassport from './config/passport.config.js';
import passport from "passport";
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

//const viewsRouter = new ViewsRouter();
const usersRouter = new UsersRouter();
/* const productsRouter = new ProductsRouter();
const cartsRouter = new CartsRouter(); */


const app = express();

// Configuración de express
// para agregar funcionalidad de json
app.use(express.json());
// para agregar funcionalidad de url params
app.use(express.urlencoded({ extended: true }));
// para agregar funcionalidad de archivos estáticos
app.use(express.static(`${__dirname}/public`));

// Configuración de handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

//configuración de passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//configuración de logger
app.use(addLogger);

//configuración de swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentación de la 4ta práctica integradora',
            description: 'API usada para el manejo de asignación de estudiantes a sus respectivos cursos'
        }
    },
    apis: [`${__mainDirname}/docs/**/*.yaml`]
};

console.log(__mainDirname);

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));


//app.use('/', viewsRouter.getRouter());
app.use('/api/users', usersRouter.getRouter());
/* app.use('/api/products', productsRouter.getRouter());
app.use('/api/carts', cartsRouter.getRouter()); */
//app.use('/api/mockingproducts', productsFakerRouter);

const PORT = config.port;

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

