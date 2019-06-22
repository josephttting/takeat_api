'use strict';

const RestaruantAccessor = require('../dataaccessors/RestaurantAccessor');
const restAccess = new RestaruantAccessor();
const OrderAccessor = require('../dataaccessors/OrderAccessor');
const orderAccess = new OrderAccessor();

class RestaurantService {
    constructor() {

    }

    async ListRestaurant() {
        return new Promise(async function(resolve, reject) {
            await restAccess.List().then(function(results) {
                resolve(results);
            });
        });
    }

    async ListRestaurantWithOrder() {
        return new Promise(async function(resolve, reject) {
            await restAccess.List().then(async function(results) {
                for(let i = 0; i < results.length; i++) {
                    delete results[i].cover_image;
                    await orderAccess.ListByRestaurant(results[i]._id).then(function(orders) {
                        results[i].orders = orders;
                    });
                }
                resolve(results);
            });
        });
    }

    async GetRestaurant(id) {
        return new Promise(async function(resolve, reject) {
            await restAccess.Get(id).then(function(results) {
                resolve(results);
            });
        });
    }

    async GetRestaurantWithOrder(id) {
        return new Promise(async function(resolve, reject) {
            await restAccess.List().then(async function(results) {
                delete results.cover_image;
                await orderAccess.ListByRestaurant(id).then(function(orders) {
                    results.orders = orders;
                });
                resolve(results);
            });
        });
    }

    async GetRestaurantByUser(user_id) {
        return new Promise(async function(resolve, reject) {
            await restAccess.GetByUser(user_id).then(async function(results) {
                delete results.cover_image;
                await orderAccess.ListByRestaurant(results._id).then(function(orders) {
                    results.orders = orders;
                });
                resolve(results);
            });
        });
    }

    async AddRestaurant(entity) {
        return new Promise(async function(resolve, reject) {
            await restAccess.Insert(entity).then(function(results) {
                resolve(results);
            });
        });
    }

    async EditRestaurant(entity) {
        return new Promise(async function(resolve, reject) {
            await restAccess.Update(entity).then(function(results) {
                resolve(results);
            });
        });
    }

    async DeleteRestaurant(id) {
        return new Promise(async function(resolve, reject) {
            await restAccess.Delete(id).then(function(results) {
                resolve(results);
            });
        });
    }
}

module.exports = RestaurantService;
