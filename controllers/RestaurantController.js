'use strict';

const express = require('express');
const router = express.Router();

const RestaurantService = require('../services/RestaurantService');
const restServ = new RestaurantService();

router.get('/',async function(req, res) {
    await restServ.ListRestaurant().then(function(results) {
        res.json(results);
    });
});

router.get('/withorder', async function(req, res) {
    await restServ.ListRestaurantWithOrder().then(function(results) {
        res.json(results);
    });
});

router.get('/:id',async function(req, res) {
    await restServ.GetRestaurant(req.params.id).then(function(results) {
        res.json(results);
    });
});

router.get('/withorder/:id',async function(req, res) {
    await restServ.GetRestaurantWithOrder(req.params.id).then(function(results) {
        res.json(results);
    });
});

router.get('/user/:user_id',async function(req, res) {
    await restServ.GetRestaurantByUser(req.params.user_id).then(function(results) {
        res.json(results);
    });
});

router.post('/',async function(req, res) {
    await restServ.AddRestaurant(req.body).then(function(results) {
        res.json(results);
    });
});

router.put('/',async function(req, res) {
    await restServ.EditRestaurant(req.body).then(function(results) {
        res.json(results);
    });
});

router.delete('/:id',async function(req, res) {
    await restServ.DeleteRestaurant(req.params.id).then(function(results) {
        res.json(results);
    });
});

module.exports = router;
