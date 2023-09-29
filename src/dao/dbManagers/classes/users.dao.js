import userModel from '../models/users.model.js';

export default class UsersDAO {
    constructor() {
        console.log('Working users with DB')
    }

    getByEmail = async (email) => {
        const user = await userModel.findOne({ email }).lean();
        return user;
    }

    save = async (user) => {
        const result = await userModel.create(user);
        return result;
    }
}