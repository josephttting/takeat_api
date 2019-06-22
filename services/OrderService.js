'use strict';

const OrderAccessor = require('../dataaccessors/OrderAccessor');
const orderAccess = new OrderAccessor();

class OrderService {
    constructor() {

    }

    async ListOrderByUser(user_id) {
        return new Promise(async function(resolve, reject) {
            await orderAccess.ListByUser(user_id).then(function(results) {
                resolve(results);
            });
        });
    }

    async ListOrder() {
        return new Promise(async function(resolve, reject) {
            await orderAccess.List().then(function(results) {
                resolve(results);
            });
        });
    }

    async GetOrder(id) {
        return new Promise(async function(resolve, reject) {
            await orderAccess.Get(id).then(function(results) {
                resolve(results);
            });
        });
    }

    async AddOrder(entity) {
        return new Promise(async function(resolve, reject) {
            /*
            for(let i = 0; i < entity.dishes.length; i++) {
                entity.total_price = entity.total_price + (entity.dishes[i].price * entity.dishes[i].quantity);
            };
            */
            await orderAccess.Insert(entity).then(function(results) {
                resolve(results);
            });
        });
    }

    async EditOrder(entity) {
        return new Promise(async function(resolve, reject) {
            await orderAccess.Update(entity).then(function(results) {
                resolve(results);
            });
        });
    }

    async DeleteOrder(id) {
        return new Promise(async function(resolve, reject) {
            await orderAccess.Delete(id).then(function(results) {
                resolve(results);
            });
        });
    }
}

module.exports = OrderService;
