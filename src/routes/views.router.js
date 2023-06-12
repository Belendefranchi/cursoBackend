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

router.get('/reset', publicAccess, (req, res) => {
    res.render('reset');
});

router.get('/', privateAccess, (req, res) => {

    const user = req.session.user;

    if (user.role === 'admin') {
        res.render('admins', { user: user });
        console.log(user.name);
        console.log(user.role);
    } else {
        res.render('users', { user: user });
        console.log(user.name);
        console.log(user.role);
    }
});

export default router;