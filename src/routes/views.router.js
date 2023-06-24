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

router.get('/reset', (req, res) => {
    res.render('reset');
});

router.get('/', privateAccess, (req, res) => {

    const user = req.session.user;

    if (user.isAdmin) {
        res.render('admins', { user: user, role: user.isAdmin });
        console.log(user.name);
        console.log(user.isAdmin);
    } else {
        res.render('users', { user: user, role: user.isAdmin });
        console.log(user.name);
        console.log(user.isAdmin);
    }
});

export default router;