import { Router } from 'express';

const router = new Router();

router.get('/', (req, res) => {
    const user = {
        name: 'John',
        role: 'admin',
    };

    res.render('index', {
        user,
        isAdmin: user.role === 'admin',
    });
});

router.get('/home', (req, res) => {
    res.render('home');
});

router.get('/realtimeproducts', (req, res) => {
    res.render('realtimeproducts');
});

export default router;