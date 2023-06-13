import { Router } from 'express';
import passport from 'passport';
import { createHash, isValidPassword } from '../utils.js';
import userModel from '../models/users.model.js';

const router = Router();

router.post('/register', passport.authenticate('register', { failureRedirect: '/fail-register' }), async (req, res) => {
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

router.get('/fail-register', (req, res) => {
    res.status(400).send({ status: 'error', message: 'Error al crear el usuario' });
});

router.post('/login', passport.authenticate('login', { failureRedirect: '/fail-login' }), async (req, res) => {
    try{
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) return res.status(400).send({ status: 'error', message: 'Usuario no encontrado' });


        if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {

            req.session.user = {
                name: `${user.first_name} ${user.last_name}`,
                email: user.email,
                age: user.age,
                role: 'admin'
            };
            console.log(req.session.user);

            res.render('admins', { user: req.session.user });
        } else {

            delete user.password;

            if(!isValidPassword(user, password)) return res.status(401).send({ status: 'error', message: 'Invalid password' });

            req.session.user = {
                name: `${user.first_name} ${user.last_name}`,
                email: user.email,
                age: user.age,
                role: 'user'
            };
            console.log(req.session.user);
            //res.redirect('/users');
            res.status(200).send({ status: 'success', message: 'Usuario creado' });
        };


    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', error: error.message });
    }
});

router.get('/fail-login', (req, res) => {
    res.status(400).send({ status: 'error', message: 'Error al iniciar sesión' });
});

router.get('/github', passport.authenticate(
    'github', { scope: ['user:email'] }
), async (req, res) => {
    res.status(200).send({ status: "success", message: "Usuario registrado con GitHub" });
});

router.get('/github-callback', passport.authenticate(
    'github', { failureRedirect: '/login' }
), async (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
});

router.post('/reset', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).send({ status: 'error', message: 'Datos incompletos' });

        const user = userModel.findOne({ email });

        if (!user) return res.status(400).send({ status: 'error', message: 'Usuario no encontrado' });

        user.password = createHash(password);

        await userModel.updateOne({ email }, user);

        res.status(200).send({ status: 'success', message: 'Contraseña actualizada' });

    } catch (error) {
        res.status(500).send({ status: 'error', message: 'Error al actualizar la contraseña' });
    };
});

router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if (error) return res.status(500).send({ status: 'error', message: 'Error al cerrar sesión' });
        res.redirect('/');
    });
});

export default router;