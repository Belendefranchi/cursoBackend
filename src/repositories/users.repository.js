import UsersDAO from '../dao/dbManagers/classes/users.dao.js'

//la capa de repositorios tiene los métodos o funciones para poder hacer transacciones hacia la base de datos, es la encargada de hacer los llamados hacia los daos que podamos tener

export default class UsersRepository {
  constructor(){
    this.dao = new UsersDAO();
  }

  getByEmail = async (email) => {
    const result = await this.dao.getByEmail(email);
    return result;
  }

  save = async (user) => {
    const result = await this.dao.save(user);
    return result;
  }
}