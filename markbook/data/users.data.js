const md5 = require('md5');
const BaseData = require('./base.data');
const User = require('../models/user.model');

class UsersData extends BaseData {
    constructor(db) {
        super(db, User, User);
    }

    checkPassword(email, password) {
        return this.findByEmail(email)
            .then((user) => {
                if (!user) {
                    throw new Error('Invalid user!');
                }

                if (user.hashPassword !== md5(password)) {
                    throw new Error('Invalid password!');
                }

                return user;
            })
            .catch((err) => {
                throw err;
            });
    }

    findByEmail(email) {
        return this
            .filterBy({ email: new RegExp(email, 'i') })
            .then(([user]) => user);
    }
}

module.exports = UsersData;
