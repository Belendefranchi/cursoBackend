import passport from 'passport';
import local from 'passport-local';
import GitHubStrategy from 'passport-github2';
import userModel from '../dao/dbManagers/models/users.model.js';
import CartManager from '../dao/dbManagers/carts.manager.js';
import cartModel from '../dao/dbManagers/models/carts.model.js';
import { createHash, isValidPassword } from '../utils/utils.js';
import dotenv from 'dotenv';

const LocalStrategy = local.Strategy;

const manager = new CartManager();

dotenv.config();
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const initializePassport = () => {

    passport.use('register', new LocalStrategy({
        passReqToCallback: true, //permite acceder a la request como cualquier otro middleware
        usernameField: 'email',
    }, async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
            const user = await userModel.findOne({ email: username });

            if (user) return done(null, false);

            const userToSave = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password),
            };

            const result = await userModel.create(userToSave);

            const newCart = {
                user: result._id,
                products: []
            };

            await manager.save(newCart);

            const userCart = await userModel.findOne({ _id: result._id });
            console.log('userCart', userCart);

            const cartId = await cartModel.findOne({ user: result._id });
            console.log('cartId', cartId);

            userCart.cart.push({ cart: cartId });

            const result2 = await userModel.updateOne({ _id: result._id }, userCart);
            return done(null, result2);

        } catch (error) {
            return done(`Error al crear el usuario: ${error}`);
        }
    }));

    passport.use('login', new LocalStrategy({
        usernameField: 'email',
    }, async (username, password, done) => {
        try {
            const user = await userModel.findOne({ email: username });
            if (!user) return done(null, false);

            if (username === ADMIN_EMAIL && password === ADMIN_PASSWORD){
                return done(null, user);
            } else{
                if (!isValidPassword(user, password)) return done(null, false);
                return done(null, user);
            }
        } catch (error) {
            console.log(error);
            return done(`Error al obtener el usuario: ${error}`);
        };
    }));

    passport.use('github', new GitHubStrategy({
        clientID: 'Iv1.ca56b204da1f0204',
        clientSecret: 'e66a288bc27ddfb3332b50d2ffae7893079549b6',
        callbackURL: 'http://localhost:8080/api/sessions/github-callback',
        scope: ['user:email']
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const email = profile.emails[0].value;
            const user = await userModel.findOne({ email });
            if (!user) {
                const newUser = {
                    first_name: profile._json.name,
                    last_name: '',
                    age: 18,
                    email,
                    password: ''
                };

                const result = await userModel.create(newUser);
                return done(null, result);
            } else {
                return done(null, user);
            };
        } catch (error) {
            return done(error);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id);
        done(null, user);
    });
};

export default initializePassport;