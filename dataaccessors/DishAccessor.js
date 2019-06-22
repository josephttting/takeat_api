'use strict';

const mongo = require('mongodb');
const db = require('./MongoConnection');

class DishAccessor {
    constructor() {

    };

    async GetModel() {
        let model = {
            "_id": "",
            "name": "",
            "description": "",
            "price": 0,
            "image": ""
        };

        return model;
    };

    async List(id) {
        return new Promise(function(resolve, reject) {
            db.getDB().collection('Dishes', function(error, collection) {
                if(error) {
                    reject(error);
                }
                collection.find({ restaurant: mongo.ObjectID(id) }).toArray(function(error, results) {
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
            db.getDB().collection('Dishes', function(error, collection) {
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
        entity.restaurant = mongo.ObjectID(entity.restaurant);
        return new Promise(function(resolve, reject) {
            db.getDB().collection('Dishes', function(error, collection) {
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
        entity.restaurant = mongo.ObjectID(entity.restaurant);
        return new Promise(function(resolve, reject) {
            db.getDB().collection('Dishes', function(error, collection) {
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

module.exports = DishAccessor;
