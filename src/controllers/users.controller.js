import * as usersService from '../services/users.service.js';
import { IncorrectLoginCredentials, NotFound, AlreadyExists } from "../utils/custom-exceptions.js";
import config from '../config/config.js'

//la capa de controladores se encarga de dar repuesta y códigos http a los clientes

const register = async (req, res) => {
  try {
    const { first_name, last_name, role, email, password } = req.body;

    if (!first_name || !last_name || !role || !email || !password )
      return res.sendClientError('User Controller: Incomplete values')

    await usersService.getByEmailRegister(email);

    const register = await usersService.register({ ...req.body });
    res.sendSuccess(register);
  } catch (error) {
    req.logger.error(error.message);

    if (error instanceof AlreadyExists) {
      return res.sendClientError('User Controller: User already exists')
    }
    res.sendServerError(error.message);
  }
}

const login = async (req, res) => {
  try {
    //recibimos los parámetros del body
    const { email, password } = req.body;

    //buscamos el usuario en base
    const user = await usersService.getByEmail(email);

    //generamos el token de acceso
    const accessToken = await usersService.login(password, user);

    const ADMIN_EMAIL = config.adminEmail;

    if (email === ADMIN_EMAIL) {
      req.session.user = {
        name: `${req.user.first_name} ${req.user.last_name}`,
        email: req.user.email,
        age: req.user.age,
        isAdmin: true
      };
      res.render('admins', { user: req.session.user, accessToken });
    } else {
      req.session.user = {
          name: `${req.user.first_name} ${req.user.last_name}`,
          email: req.user.email,
          age: req.user.age
      };
      res.render('users', { user: req.session.user, accessToken });
    }
  } catch (error) {
    req.logger.error(error.message);

    //manejo de excepciones mediante clases customizadas extendiendo la clase padre Error
    if (error instanceof NotFound){
      return res.sendClientError('User Controller: User not found');
    }

    if (error instanceof IncorrectLoginCredentials){
      return res.sendClientError('User Controller: Incorrect credentials');
    }
    res.sendServerError(error.message);
  }
}

const logout = async (req, res) => {
  req.session.destroy(error => {
    if (error){
        return res.sendServerError(error.message);
    }
    res.redirect('/');
});
}

const reset = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendClientError('User Controller: Incomplete values');
    };

    const user = await userModel.findOne({ email });

    user.password = createHash(password);

    await userModel.updateOne({ email }, user);

    res.sendSuccess('Password updated');

} catch (error) {
  req.logger.error(error.message);

  if (error instanceof NotFound){
    return res.sendClientError('User Controller: User not found');
  }
    res.sendServerError(error.message);
};
}

export {
  register,
  login,
  logout,
  reset
}