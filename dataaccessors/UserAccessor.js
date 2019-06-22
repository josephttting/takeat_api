'use strict';

const mongo = require('mongodb');
const db = require('./MongoConnection');

class UserAccessor {
    constructor() {

    };

    async GetModel() {
        let model = {
            "_id": "",
            "role": 0,
            "name": "",
            "email": "",
            "password": ""
        };

        return model;
    };

    async List() {
        return new Promise(function(resolve, reject) {
            db.getDB().collection('Users', function(error, collection) {
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
            db.getDB().collection('Users', function(error, collection) {
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

    async GetByEmail(email) {
        return new Promise(function(resolve, reject) {
            db.getDB().collection('Users', function(error, collection) {
                if(error) {
                    reject(error);
                }
                collection.findOne({ "email": email }, function(error, results) {
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
        return new Promise(function(resolve, reject) {
            db.getDB().collection('Users', function(error, collection) {
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

    async Update() {
        let id = entity._id;;
        delete entity._id;
        return new Promise(function(resolve, reject) {
            db.getDB().collection('Users', function(error, collection) {
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

    async Delete() {
        return new Promise(function(resolve, reject) {
            db.getDB().collection('Users', function(error, collection) {
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

module.exports = UserAccessor;
