import { IncorrectLoginCredentials, AlreadyExists, NotFound } from "../utils/custom-exceptions.js";
import { loginNotification } from "../utils/custom-html.js";
import { isValidPassword, generateToken, createHash } from '../utils/utils.js'
import { sendEmail } from "./mail.js";
import UsersRepository from '../repositories/users.repository.js'

const users = new Users();
const usersRepository = new UsersRepository(users);

const getByEmail = async (email) => {
  const user = await this.usersRepository.getByEmail(email);
  if (!user){
    throw new NotFound('Service: User not found');
  }
  return user;
}

const login = async (password, user) => {
  const comparePassword = isValidPassword(user, password);

  if (!comparePassword){
    throw new IncorrectLoginCredentials('Service: Incorrect credentials');
  }
  const accessToken = generateToken(user);

  const email = {
    to: user.email,
    subject: 'Intento de login',
    html: loginNotification
  }
  await sendEmail(email);

  return accessToken;
}

const getByEmailRegister = async (email) => {
  const user = await this.usersRepository.getByEmail(email);
  if (user){
    throw new AlreadyExists('Service: User already exists');
  }
}

const register = async (user) => {
  //hasheamos el password del usuario
  const hashedPassword = createHash(user.password);
  user.password = hashedPassword;

  //guardamos el nuevo usuario en base
  const result = await this.usersRepository.save(user);
  return result;
}

export {
  getByEmail,
  login,
  getByEmailRegister,
  register
}