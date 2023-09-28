import { fileURLToPath } from "url";
import path from "path";
import bcrypt from 'bcrypt';
import config from '../config/config.js'
import { PRIVATE_KEY } from '../config/constants.js';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import winston from 'winston';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __mainDirname = path.join(__dirname, '..');

const createHash = password =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const isValidPassword = (user, password) =>
    bcrypt.compareSync(password, user.password);

const generateToken = (user) => {
    const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '24h' });
    return token;
};

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, __dirname+'public/images')
    },
    filename: function(req, file, cb) {
        cb(null,Date.now() + '-' + (file.originalname))
    },
});

const upload = multer({ storage });

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.userNodemailer,
        pass: config.passNodemailer
    }
});

const customLevelOptions = {
    levels: {
        error: 0,
        warning: 1,
        info: 2,
        debug: 3
    },
    colors: {
        'error': 'red',
        'warning': 'yellow',
        'info': 'green',
        'debug': 'blue'
    }
};

const logger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(
                winston.format.colorize({
                    all: true,
                    colors: customLevelOptions.colors
                }),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: 'logs/logs.log',
            level: 'error'
        })
    ]
});

const addLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.info(`${req.method} en ${req.url} - ${new Date().toISOString()}`)
    next();
};

export {
    __dirname,
    __mainDirname,
    createHash,
    isValidPassword,
    generateToken,
    upload,
    transporter,
    addLogger
};