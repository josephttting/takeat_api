'use strict';

let _db;

let getDB = function() {
    return _db;
}

let setDB = function(db) {
    _db = db;
}

module.exports = {
    getDB,
    setDB
}