import { Router } from 'express';

const router = new Router();

//Acceso público
const publicAccess = (req, res, next) => {
    if (req.session?.user) return res.redirect('/products');
    next();
};

//Acceso privado
const privateAccess = (req, res, next) => {
    if (!req.session?.user) return res.redirect('/login');
    next();
};

router.get('/register', publicAccess, (req, res) => {
    res.render('register');
});

router.get('/login', publicAccess, (req, res) => {
    res.render('login', { title: 'Bienvenido al almacén de Coder', message: 'Inicia sesión' });
});

router.get('/', privateAccess, (req, res) => {
    res.render('products', {
        user: req.session.user
    });
});

/* router.get('/', (req, res) => {
    res.render('index', { title: 'Bienvenido al almacén de Coder', message: 'Inicia sesión' });
}); */

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