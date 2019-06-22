'use strict';

const mongo = require('mongodb');
const db = require('./MongoConnection');

class RestaurantAccessor {
    constructor() {

    };

    async GetModel() {
        let model = {
            "_id": "",
            "name": "",
            "description": "",
            "manager": "",
            "address": "",
            "phone": "",
            "rate": "",
            "cover_image": ""
        };

        return model;
    };

    async List() {
        return new Promise(function(resolve, reject) {
            db.getDB().collection('Restaurants', function(error, collection) {
                if(error) {
                    reject(error);
                }
                collection.find({}).toArray(function(error, results) {
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
            db.getDB().collection('Restaurants', function(error, collection) {
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

    async GetByUser(id) {
        return new Promise(function(resolve, reject) {
            db.getDB().collection('Restaurants', function(error, collection) {
                if(error) {
                    reject(error);
                }
                collection.findOne({ "manager": mongo.ObjectID(id) }, function(error, results) {
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
        entity.manager = mongo.ObjectID(entity.manager);
        return new Promise(function(resolve, reject) {
            db.getDB().collection('Restaurants', function(error, collection) {
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
        entity.manager = mongo.ObjectID(entity.manager);
        return new Promise(function(resolve, reject) {
            db.getDB().collection('Restaurants', function(error, collection) {
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
            db.getDB().collection('Restaurants', function(error, collection) {
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
};

module.exports = RestaurantAccessor;
