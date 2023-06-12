import passport from 'passport';
import local from 'passport-local';
import GitHubStrategy from 'passport-github2';
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
                done(null, result);
            } else {
                done(null, user);
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