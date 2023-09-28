import { Router as expressRouter } from 'express';
import passport from 'passport';
import { passportStrategiesEnum } from '../config/enums.js';

//la capa de ruteo se encarga de definir las rutas de los servicios web, la aplicación de middlewares y el llamado hacia los métodos en la capa inferior, la capa de controladores.
export default class Router {
  constructor() {
    this.router = expressRouter();
    this.init();
  }

  getRouter() {
    return this.router;
  }

  init() {}
  get(path, policies, passportStrategy, ...callbacks) {
    this.router.get(
        path,
        this.applyCustomPassportCall(passportStrategy),
        this.handlePolicies(policies),
        this.generateCustomResponse,
        this.applyCallbacks(callbacks)
    );
}

post(path, policies, passportStrategy, ...callbacks) {
    this.router.post(
        path,
        this.applyCustomPassportCall(passportStrategy),
        this.handlePolicies(policies),
        this.generateCustomResponse,
        this.applyCallbacks(callbacks)
    );
}

put(path, policies, passportStrategy, ...callbacks) {
    this.router.put(
        path,
        this.applyCustomPassportCall(passportStrategy),
        this.handlePolicies(policies),
        this.generateCustomResponse,
        this.applyCallbacks(callbacks)
    );
}

delete(path, policies, passportStrategy, ...callbacks) {
    this.router.delete(
        path,
        this.applyCustomPassportCall(passportStrategy),
        this.handlePolicies(policies),
        this.generateCustomResponse,
        this.applyCallbacks(callbacks)
    );
}


//aplica la autenticación de Passport.js utilizando una estrategia específica, solo si la estrategia es JWT (JSON Web Token). Si no es JWT, pasa la solicitud al siguiente middleware.
applyCustomPassportCall = (strategy) => (req, res, next) => {
    if (strategy === passportStrategiesEnum.JWT){
        passport.authenticate(strategy, function (err, user, info) {
            if (err) return next(err);

            if (!user)
                return res.status(401).send({
                    error: info.messages ? info.messages : info.toString()
                });
            req.user = user;
            next();
        })(req, res, next);
    } else {
        next();
    }
}


//verifica si el rol del usuario (extraído de Passport.js) coincide con alguna de las políticas especificadas. Si el rol del usuario no está en las políticas, devuelve una respuesta 403 Prohibido.
handlePolicies = (policies) => (req, res, next) => {
    if(policies[0] === 'PUBLIC') return next();

    const user = req.user;

    if(!policies.includes(user.role.toUpperCase()))
        return res.status(403).json({ message: 'Forbidden' });

    next();
}

  //agrega métodos de respuesta personalizados (sendSuccess, sendServerError, sendClientError) al objeto de respuesta.
  generateCustomResponse = (req, res, next) => {
    res.sendSuccess = (data) => {
      res.status(200).json({ data });
    };
    res.sendServerError = (error) => {
      res.status(500).json({ error: error });
    };
    res.sendClientError = (error) => {
      res.status(400).json({ error: error });
    };
    next();
  }

  //representan las funciones controladoras de las rutas. Si ocurre un error dentro de un callback, se captura y se envía una respuesta de error con un código 500 (Error interno del servidor).
  applyCallbacks(callbacks) {
    return callbacks.map((callback) => async (...params) => {
      try {
        await callback.apply(this, params);//req, res, next
      } catch (error) {
        params[1].status(500).send({ error: error.message });
      }
    });
  }
}