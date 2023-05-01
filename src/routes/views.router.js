import { Router } from 'express';
import ProductManager from "../../managers/ProductManager.js";


const router = new Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'Bienvenido al almacén de Coder', message: 'Por favor introduce tu nombre y elige tu rol:' });
});

router.post('/', (req, res) => {
    const user = req.body;
    const userName = user.name;
    const userRole = user.role;
    if(userRole === 'admin'){
        console.log(userRole);
        res.render('admins', user);
    }else{
        console.log(userRole);
        res.render('users', user);
    }
});

export default router;