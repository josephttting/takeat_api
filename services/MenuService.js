'use strict';

const MenuAccessor = require('../dataaccessors/MenuAccessor');
const menuAccess = new MenuAccessor();

class MenuService {
    constructor() {

    };

    async ListMenu(restaurantID) {
        return new Promise(async function(resolve, reject) {
            await menuAccess.List(restaurantID).then(function(results) {
                resolve(results);
            });
        });
    };

    async GetMenu(id) {
        return new Promise(async function(resolve, reject) {
            await menuAccess.Get(id).then(function(results) {
                resolve(results);
            });
        });
    };

    async AddMenu(entity) {
        return new Promise(async function(resolve, reject) {
            await menuAccess.Insert(entity).then(function(results) {
                resolve(results);
            });
        });
    };

    async EditMenu(entity) {
        return new Promise(async function(resolve, reject) {
            await menuAccess.Update(entity).then(function(results) {
                resolve(results);
            });
        });
    };

    async DeleteMenu(id) {
        return new Promise(async function(resolve, reject) {
            await menuAccess.Delete(id).then(function(results) {
                resolve(results);
            });
        });
    };
}

module.exports = MenuService;
