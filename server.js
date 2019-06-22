'use strict';

const express = require('express');
const cors = require('cors');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const config = require('./config');
const db = require('./dataaccessors/MongoConnection');
const JSONbig = require('json-bigint');
const jwt = require('jsonwebtoken');

const AuthrizeController = require('./controllers/AuthrizeController');
const MenuController = require('./controllers/MenuController');
const DishController = require('./controllers/DishController');
const RestaurantController = require('./controllers/RestaurantController');
const UserController = require('./controllers/UserController');
const OrderController = require('./controllers/OrderController');

app.use(cors());
app.options('*', cors());
app.use(function(req, res, next){
    let data = '';
    req.on('data', function(chunk){ data += chunk })
    req.on('end', function() {
        if(data !== '') {
            req.body = JSONbig.parse(data);
        }
        next();
    });
});
/*
app.use(function(req, res, next){
    if(req.originalUrl === '/api/login') {
        next();
    }
    else {
        let token = req.query.token || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, config.jwt_secret, function (err, decoded) {
            if (err) {
                return res.status(403).json({message: 'Failed to authenticate token.'});
            }
            else {
                req.decoded = decoded;
                next();
            }
            });
        }
        else {
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        };
    }
});
*/
app.use('/api/login', AuthrizeController);
app.use('/api/dish', DishController);
app.use('/api/menu', MenuController);
app.use('/api/restaurant', RestaurantController );
app.use('/api/user', UserController);
app.use('/api/order', OrderController);

app.get('/', function (req, res) {
    res.send('Hello World!');
});

MongoClient.connect(config.mongodb_host, { useNewUrlParser: true }).then(function(client) {
    const database = client.db(config.mongodb_name);
    db.setDB(database);

    app.listen(3000, function () {
        console.log('API listening on port 3000!');
    });
})
.catch(error => console.error(error));
