import { Router } from 'express';
import passport from 'passport';
import { createHash } from '../utils.js';
import userModel from '../models/users.model.js';

const router = Router();

router.post('/register', passport.authenticate('register', { failureRedirect: 'fail-register' }), async (req, res) => {
    res.status(200).send({ status: 'success', message: 'Usuario creado' });
});

router.get('/fail-register', (req, res) => {
    res.send({ status: 'error', message: 'Error al crear el usuario' });
});

router.post('/login', passport.authenticate('login', { failureRedirect: 'fail-login' }), async (req, res) => {

    if (!req.user) return res.status(400).send({ status: 'error', message: 'Error al iniciar sesión' });

    const { email, password } = req.body;

    if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {

        req.session.user = {
            name: `${req.user.first_name} ${req.user.last_name}`,
            email: req.user.email,
            age: req.user.age,
            role: 'admin'
        };
        console.log('true: admin')
        return res.render('admins');

    } else {

        req.session.user = {
            name: `${req.user.first_name} ${req.user.last_name}`,
            email: req.user.email,
            age: req.user.age,
            role: 'user'
        };
        console.log('false: user')
        return res.render('users');
    };
});

/* router.post('/login', passport.authenticate('login', {failureRedirect: 'fail-login'}), async (req, res) => {

    if (!req.user) return res.status(400).send({ status: 'error', message: 'Invalid credentials' });

    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email,
    }

    res.status(200).send({ status: 'success', message: 'Login success' });

}); */

router.get('/fail-login', (req, res) => {
    res.send({ status: 'error', message: 'Error al iniciar sesión' });
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