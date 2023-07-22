import { Router } from 'express';
//import Router from './router.js';
import passport from 'passport';
import { createHash } from '../utils.js';
import userModel from '../dao/dbManagers/models/users.model.js';
import dotenv from 'dotenv';

const router = Router();

dotenv.config();
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

/* export default class SessionsRouter extends Router {
    init(){
        this.post('/register', ['PUBLIC'], passport.authenticate('register', { failureRedirect: 'fail-register' }), async (req, res) => {
            console.log(`Sessions.router: register success, ${req.user}`)
            return res.sendSuccess("<script>alert('Usuario creado correctamente')</script>");
        });

        this.get('/fail-register', ['PUBLIC'], (req, res) => {
            console.log(`Sessions.router: register fails ${req.user}`)
            res.sendServerError("<script>alert('Error al crear el usuario')</script>");
        });

        this.post('/login', ['PUBLIC'], passport.authenticate('login', { failureRedirect: 'fail-login' }), async (req, res) => {
            if (!req.user) {
                console.log('Sessions.router, login incomplete values')
                res.sendServerError("<script>alert('Error al iniciar sesión')</script>");
            }

            const { email } = req.body;

            if (email === ADMIN_EMAIL) {

                req.session.user = {
                    name: `${req.user.first_name} ${req.user.last_name}`,
                    email: req.user.email,
                    age: req.user.age,
                    isAdmin: true
                };
                console.log('Sessions login: admin')
                return res.render('admins', { user: req.session.user });

            } else {

                req.session.user = {
                    name: `${req.user.first_name} ${req.user.last_name}`,
                    email: req.user.email,
                    age: req.user.age,
                    cartId: req.user.cart[0].cart.toString()
                };
                console.log('Sessions login: user')
                console.log(req.session.user)
                return res.render('users', { user: req.session.user });
            };
        });

        this.get('/fail-login', ['PUBLIC'], (req, res) => {
            console.log(`Sessions.router: login fails ${req.user}`)
            res.sendServerError("<script>alert('Error al iniciar sesión')</script>");
        });

        this.get('/github', ['PUBLIC'], passport.authenticate(
            'github', { scope: ['user:email'] }
        ), async (req, res) => {
            return res.sendSuccess("<script>alert('Usuario registrado con GitHub')</script>");
        });

        this.get('/github-callback', ['PUBLIC'], passport.authenticate(
            'github', { failureRedirect: '/login' }
        ), async (req, res) => {
            req.session.user = req.user;
            res.redirect('/');
        });

        this.post('/reset', ['PUBLIC'], async (req, res) => {
            try {
                const { email, password } = req.body;
                console.log(req.body);

                if (!email || !password) {
                    console.log('Datos incompletos');
                    return res.sendClientError("<script>alert('Datos incompletos')</script>")
                };

                const user = await userModel.findOne({ email });

                if (!user) {
                    console.log('Usuario no encontrado');
                    return res.sendClientError("<script>alert('Usuario no encontrado')</script>")
                };
                user.password = createHash(password);

                await userModel.updateOne({ email }, user);

                console.log('Contraseña actualizada');
                res.sendSuccess("<script>alert('Contraseña actualizada')</script>");

            } catch (error) {
                console.log('Error al actualizar la contraseña');
                res.sendServerError("<script>alert('Error al actualizar la contraseña')</script>");
            };
        });

        this.get('/logout', ['USER', 'ADMIN'], (req, res) => {
            req.session.destroy(error => {
                if (error){
                    return res.sendServerError("<script>alert('Error al cerrar sesión')</script>");
                }
                res.redirect('/');
            });
        });
    }
} */

//#################### ANTES DE CAPAS ####################//

router.post('/register', passport.authenticate('register', { failureRedirect: 'fail-register' }), async (req, res) => {
    console.log(`Sessions.router: register success, ${req.user}`)
    res.status(200).send({ status: 'success', message: 'Usuario creado' });
});

router.get('/fail-register', (req, res) => {
    console.log(`Sessions.router: register fails ${req.user}`)
    res.status(400).send({ status: 'error', message: 'Error al crear el usuario' });
});

router.post('/login', passport.authenticate('login', { failureRedirect: 'fail-login' }), async (req, res) => {
    if (!req.user) {
        console.log('Sessions.router, login incomplete values')
        res.status(400).send({ status: 'error', message: 'Error al iniciar sesión' });
    }

    const { email } = req.body;

    if (email === ADMIN_EMAIL) {

        req.session.user = {
            name: `${req.user.first_name} ${req.user.last_name}`,
            email: req.user.email,
            age: req.user.age,
            isAdmin: true
        };
        console.log('Sessions login: admin')
        return res.render('admins', { user: req.session.user });

    } else {

        req.session.user = {
            name: `${req.user.first_name} ${req.user.last_name}`,
            email: req.user.email,
            age: req.user.age,
            cartId: req.user.cart[0].cart.toString()
        };
        console.log('Sessions login: user')
        console.log(req.session.user)
        return res.render('users', { user: req.session.user });
    };
});

router.get('/fail-login', (req, res) => {
    console.log(`Sessions.router: login fails ${req.user}`)
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
        console.log(req.body);

        if (!email || !password) {
            console.log('Datos incompletos');
            return res.status(400).send({ status: 'error', message: 'Datos incompletos' });
        };

        const user = await userModel.findOne({ email });

        if (!user) {
            console.log('Usuario no encontrado');
            return res.status(400).send({ status: 'error', message: 'Usuario no encontrado' });
        };
        user.password = createHash(password);

        await userModel.updateOne({ email }, user);

        console.log('Contraseña actualizada');
        res.status(200).send({ status: 'success', message: 'Contraseña actualizada' });

    } catch (error) {
        console.log('Error al actualizar la contraseña');
        res.status(500).send({ status: 'error', message: 'Error al actualizar la contraseña' });
    };
});

router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if (error){
            return res.status(500).send({ status: 'error', message: 'Error al cerrar sesión' });
        }
        res.redirect('/');
    });
});

export default router;