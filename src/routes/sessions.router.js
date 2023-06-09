import { Router } from 'express';
import { createHash, isValidPassword } from '../utils.js';
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
            password: createHash(password)
        };

        await userModel.create(user);
        res.status(200).send({ status: 'success', message: 'Usuario creado' });

    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }
});

router.post('/login', async (req, res) => {
    try{
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
            req.session.user = {
                name: `${user.first_name} ${user.last_name}`,
                email: user.email,
                age: user.age,
                role: 'admin'
            };

            res.render('admins');

        } else {

            const user = await userModel.findOne({ email });

            if (!user) return res.status(404).send({ status: 'error', message: 'Usuario no encontrado' });

            if(!isValidPassword(user, password)) return res.status(401).send({ status: 'error', message: 'Invalid password' });

            delete user.password;

            req.session.user = {
                name: `${user.first_name} ${user.last_name}`,
                email: user.email,
                age: user.age,
                role: 'user'
            };

            res.render('users');
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', error: error.message });
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if (error) return res.status(500).send({ status: 'error', message: 'Error al cerrar sesión' });
        res.redirect('/');
    });
});

export default router;