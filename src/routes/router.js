import { Router as expressRouter } from 'express';
import jwt from 'jsonwebtoken';

export default class Router {
  constructor() {
    this.router = expressRouter();
    this.init();
  }

  getRouter() {
    return this.router;
  }

  init() {}
  get(path, policies, ...callbacks) {
    this.router.get(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponse,
      this.applyCallbacks(callbacks)
    );
  }

  post(path, policies, ...callbacks) {
    this.router.post(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponse,
      this.applyCallbacks(callbacks)
    );
  }

  handlePolicies = (policies) => (req, res, next) => {
    if (policies[0] === 'PUBLIC') return next();
    const authToken = req.headers['authorization'] || req.headers ['Authorization'];

    if(!authToken)
      return res.status(401).json({ error: 'No token provided' });

    const token = authToken.split(' ')[1];

    const user = jwt.verify(token, 'secretCoder');

    if(!policies.includes(user.role.toUpperCase()))
      return res.status(403).json({ error: 'Forbbiden' });

    req.user = user;
    next();
  }

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