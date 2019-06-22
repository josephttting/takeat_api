'use strict';

const DishesAccessor = require('../dataaccessors/DishAccessor');
const dishesAccess = new DishesAccessor();

class DishService {
    constructor() {

    }

    async ListDishes(id) {
        return new Promise(async function(resolve, reject) {
            await dishesAccess.List(id).then(function(results) {
                resolve(results);
            });
        });
    }

    async GetDishes(id) {
        return new Promise(async function(resolve, reject) {
            await dishesAccess.Get(id).then(function(results) {
                resolve(results);
            });
        });
    }

    async AddDishes(entity) {
        return new Promise(async function(resolve, reject) {
            await dishesAccess.Insert(entity).then(function(results) {
                resolve(results);
            });
        });
    }

    async EditDishes(entity) {
        return new Promise(async function(resolve, reject) {
            await dishesAccess.Update(entity).then(function(results) {
                resolve(results);
            });
        });
    }

    async DeleteDishes(id) {
        return new Promise(async function(resolve, reject) {
            await dishesAccess.Delete(id).then(function(results) {
                resolve(results);
            });
        });
    }
}

module.exports = DishService;
