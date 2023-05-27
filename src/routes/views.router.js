import { Router } from 'express';

const router = new Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'Bienvenido al almacén de Coder', message: 'Por favor introduce tu nombre y elige tu rol:' });
});

router.post('/', (req, res) => {
    const user = req.body;
    const userRole = user.role;
    const userName = user.name;
    if(userRole === 'admin'){
        console.log(userRole);
        console.log(userName);
        res.render('admins', { userName });
    }else{
        console.log(userRole);
        console.log(userName);
        res.render('users', { userName });
    }
});

export default router;