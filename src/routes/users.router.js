//import { Router } from 'express';
import Router from './router.js';
import { passportStrategiesEnum } from '../config/enums.js';
import { register, login, logout, reset } from '../controllers/users.controller.js'

export default class SessionsRouter extends Router {
    init() {
        this.post('/register', ['PUBLIC'], passportStrategiesEnum.NOTHING, register);
        this.post('/login', ['PUBLIC'], passportStrategiesEnum.NOTHING, login);
        this.get('/logout', ['PUBLIC'], passportStrategiesEnum.NOTHING, logout);
        this.post('/reset', ['PUBLIC'], passportStrategiesEnum.NOTHING, reset);
    }
}