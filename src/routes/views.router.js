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

export default router;