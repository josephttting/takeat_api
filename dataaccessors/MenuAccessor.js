'use strict';

const mongo = require('mongodb');
const db = require('./MongoConnection');

class MenuAccessor {
    constructor() {

    };

    async GetModel() {
        let model = {
            "_id": "",
            "restaurant_id": "",
            "name": "",
            "priority": 0
        };

        return model;
    };

    async List(restaurantID) {
        return new Promise(function(resolve, reject) {
            db.getDB().collection('Menus', function(error, collection) {
                if(error) {
                    reject(error);
                }
                collection.find({ "restaurant_id" : mongo.ObjectID(restaurantID) }).toArray(function(error, results) {
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
            db.getDB().collection('Menus', function(error, collection) {
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
        entity.restaurant_id = mongo.ObjectID(entity.restaurant_id);
        return new Promise(function(resolve, reject) {
            db.getDB().collection('Menus', function(error, collection) {
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
        entity.restaurant_id = mongo.ObjectID(entity.restaurant_id);
        return new Promise(function(resolve, reject) {
            db.getDB().collection('Menus', function(error, collection) {
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
            db.getDB().collection('Menus', function(error, collection) {
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

module.exports = MenuAccessor;
