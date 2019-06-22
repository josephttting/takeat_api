'use strict';

const UserAccessor = require('../dataaccessors/UserAccessor');
const userAccess = new UserAccessor();
const bcrypt = require('bcrypt');

class UserService {
    constructor() {

    }

    async ListUser() {
        return new Promise(async function(resolve, reject) {
            await userAccess.List().then(function(results) {
                resolve(results);
            });
        });
    };

    async GetUser(id) {
        return new Promise(async function(resolve, reject) {
            await userAccess.Get(id).then(function(results) {
                resolve(results);
            });
        });
    };

    async AddUser(entity) {
        entity.password = bcrypt.hashSync(entity.password, 10);
        return new Promise(async function(resolve, reject) {
            await userAccess.Insert(entity).then(function(results) {
                resolve(results);
            });
        });
    };

    async EditUser(entity) {
        return new Promise(async function(resolve, reject) {
            await userAccess.Update(entity).then(function(results) {
                resolve(results);
            });
        });
    };

    async DeleteUser(id) {
        return new Promise(async function(resolve, reject) {
            await userAccess.Delete(id).then(function(results) {
                resolve(results);
            });
        });
    };

    async ValidateUser(entity) {
        return new Promise(async function(resolve, reject) {
            if(entity === null) {
                resolve();
            }
            await userAccess.GetByEmail(entity.email).then(function(result) {
                if(result != []) {
                    if (bcrypt.compareSync(entity.password, result.password)) {
                        resolve([true, result]);
                    };
                    resolve(false);
                }
                else {
                    resolve(false);
                };
            });
        });
    };
}

module.exports = UserService;
