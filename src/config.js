import dotenv from 'dotenv';

const environment = 'DEVELOPMENT';

dotenv.config(
    path, environment === 'DEVELOPMENT' ? './.env.development' : './.env.production'
);

export default {
    persistence: process.env.PERSISTENCE,
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
};