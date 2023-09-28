import { IncorrectLoginCredentials, AlreadyExists, NotFound } from "../utils/custom-exceptions.js";
import { loginNotification } from "../utils/custom-html.js";
import { isValidPassword, generateToken, createHash } from '../utils/utils.js'
import { sendEmail } from "./mail.js";

export default class UsersService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async getByEmail (email) {
    const user = await this.usersRepository.getByEmail(email);
    if (!user){
      throw new NotFound('Service: User not found');
    }
    return user;
  }

  async login (password, user) {
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

  async getByEmailRegister (email) {
    const user = await this.usersRepository.getByEmail(email);
    if (user){
      throw new AlreadyExists('Service: User already exists');
    }
  }

  async register (user) {
    //hasheamos el password del usuario
    const hashedPassword = createHash(user.password);
    user.password = hashedPassword;

    //guardamos el nuevo usuario en base
    const result = await this.usersRepository.save(user);
    return result;
  }
}
