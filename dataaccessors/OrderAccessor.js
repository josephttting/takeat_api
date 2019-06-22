'use strict';

const mongo = require('mongodb');
const db = require('./MongoConnection');

class OrderAccessor {
    constructor() {

    };

    async GetModel() {
        let model = {
            "_id": "",
            "restaurant": "",
            "orderer": "",
            "create_time": "",
            "address": "",
            "phone": "",
            "status": 0,
            "total_price": 0,
            "dishes": [
                {
                    "_id": "",
                    "name": "",
                    "description": "",
                    "price": 0,
                    "image": "",
                    "quantity": 0,
                    "remark": "",
                }
            ]
        };

        return model;
    };

    async ListByUser(user_id) {
        return new Promise(function(resolve, reject) {
            db.getDB().collection('Orders', function(error, collection) {
                if(error) {
                    reject(error);
                }
                collection.find({ orderer: user_id }).toArray(function(error, results) {
                    if(error) {
                        reject(error);
                    }
                    resolve(results);
                });
            });
        });
    };

    async ListByRestaurant(restaurant_id) {
        return new Promise(function(resolve, reject) {
            db.getDB().collection('Orders', function(error, collection) {
                if(error) {
                    reject(error);
                }
                collection.find({ restaurant: restaurant_id.toString() }).toArray(function(error, results) {
                    if(error) {
                        reject(error);
                    }
                    resolve(results);
                });
            });
        });
    };

    async List() {
        return new Promise(function(resolve, reject) {
            db.getDB().collection('Orders', function(error, collection) {
                if(error) {
                    reject(error);
                }
                collection.find().toArray(function(error, results) {
                    if(error) {
                        reject(error);
                    }
                    resolve(results);
                });
            });
        });
    };

    async Get(id) {
        return new Promise(function(resolve, reject) {
            db.getDB().collection('Orders', function(error, collection) {
                if(error) {
                    reject(error);
                }
                collection.findOne({ "_id": mongo.ObjectID(id) }, function(error, results) {
                    if(error) {
                        reject(error);
                    }
                    resolve(results);
                });
            });
        });
    };

    async Insert(entity) {
        delete entity._id;
        for(let i = 0; i < entity.dishes.length; i++) {
            entity.dishes[i]._id = mongo.ObjectID(entity.dishes[i]._id);
        };
        return new Promise(function(resolve, reject) {
            db.getDB().collection('Orders', function(error, collection) {
                if(error) {
                    reject(error);
                }
                collection.insertOne(entity, function(error, results) {
                    if(error) {
                        reject(error);
                    }
                    resolve(results);
                });
            });
        });
    };

    async Update(entity) {
        let id = entity._id;;
        delete entity._id;
        for(let i = 0; i < entity.dishes.length; i++) {
            entity.dishes[i]._id = mongo.ObjectID(entity.dishes[i]._id);
        };
        return new Promise(function(resolve, reject) {
            db.getDB().collection('Orders', function(error, collection) {
                if(error) {
                    reject(error);
                }
                collection.replaceOne({ "_id": mongo.ObjectID(id) }, entity, function(error, results) {
                    if(error) {
                        reject(error);
                    }
                    resolve(results);
                });
            });
        });
    };

    async Delete(id) {
        return new Promise(function(resolve, reject) {
            db.getDB().collection('Dishes', function(error, collection) {
                if(error) {
                    reject(error);
                }
                collection.deleteOne({ "_id": mongo.ObjectID(id) }, function(error, results) {
                    if(error) {
                        reject(error);
                    }
                    resolve(results);
                });
            });
        });
    };
}

module.exports = OrderAccessor;
