import passport from 'passport';
import local from 'passport-local';
import userModel from '../models/users.model.js';
import { isValidPassword } from '../utils.js';

const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.use('register', new LocalStrategy({
        usernameField: 'email',
    }, async (username, password, done) => {
        try {
            const user = await userModel.findOne({ email: username });

            if (!user) return done(null, false);

            if(!isValidPassword(user, password)) return done(null, false);

            return done(null, user);

        } catch (error) {
            return done(`Error al obtener el usuario: ${error}`);
        }
    }));

    passport.use('login', new LocalStrategy({
        usernameField: 'email',
    }, async (username, password, done) => {
        try {
            const user = await userModel.findOne({ email: username });

            if (!user) return done(null, false);

            if (!isValidPassword(user, password)) return done(null, false);

            return done(null, user);

        } catch (error) {
            return done(`Error al obtener el usuario: ${error}`);
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