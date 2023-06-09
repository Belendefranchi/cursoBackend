import { Router } from 'express';
import userModel from '../models/users.model.js';

const router = Router();

router.post('/register', async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;
        const exists = await userModel.findOne({ email });

        if (exists) return res.status(400).send('El email ya está registrado');

        const user = {
            first_name,
            last_name,
            email,
            age,
            password
        };

        await userModel.create(user);
        //res.redirect('/');
        res.status(201).send({ status: 'success', message: 'Usuario creado' });

    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }
});

router.post('/login', async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await userModel.findOne({ email, password });

        if (!user) return res.status(404).send({ status: 'error', message: 'Credenciales incorrectas' });

        if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
            req.session.user = {
                name: `${user.first_name} ${user.last_name}`,
                email: user.email,
                age: user.age,
                role: 'admin'
            };

            res.render('admins');
        } else {
            req.session.user = {
                name: `${user.first_name} ${user.last_name}`,
                email: user.email,
                age: user.age,
                role: 'user'
            };
            res.render('users');
        }

        //res.status(201).send({ status: 'success', message: 'Login exitoso' });

    } catch {
        res.status(500).send({ status: 'error', error });
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if (error) return res.status(500).send({ status: 'error', message: 'Error al cerrar sesión' });
        res.redirect('/');
    });
});

export default router;