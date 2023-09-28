import config from '../config/config.js';

export let Users;

const persistence = config.persistence;

switch (persistence) {
  case 'MONGO':
    const mongoose = await import ('mongoose');
    await mongoose.connect(config.mongoUrl);
    const { default: UsersMongo } = await import ('./dbManagers/users.dao.js');
    Users = UsersMongo;
    break;
  case 'FILE':
/*     const { default: UsersFile } = await import ('./fileManagers/users.js');
    Users = UsersFile; */
    break;
}