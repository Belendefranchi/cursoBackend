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
app.use('/realtimeproducts', viewsRouter)
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


/* app.get('/products', async (req, res) => {

    const limit= req.query.limit;
    
    const productResult = await manager.getProducts();
    if(limit){
        res.send(productResult.slice(0, limit));
    }else{	
        res.send(productResult);
    }
}); */

/* app.get('/products/add', async (req, res) => {
    const product = { 
        title: 'Producto prueba', 
        description: 'Este es un producto prueba', 
        price: 200, 
        thumbnail: 'Sin imagen',
        stock: 25 
    };
    await manager.addProduct(product);
    res.send(product);
}); */

/* app.get('/products/del', async (req, res) => {
    const del = async () => {
        await manager.deleteProduct();
    };
    setTimeout(() => {
    del();
}, 5000);
    res.send("Se eliminó el archivo");
}); */

/* app.get('/products/:pid', async (req, res) => {
    const productResult = await manager.getProductsById(Number(req.params.pid));
    res.send(productResult);
}); */


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

