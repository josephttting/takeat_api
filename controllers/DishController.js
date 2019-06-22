'use strict';

const express = require('express');
const router = express.Router();

const DishesService = require('../services/DishService');
const dishesServ = new DishesService();

router.get('/list/:restaurantID',async function(req, res) {
    await dishesServ.ListDishes(req.params.restaurantID).then(function(results) {
        res.json(results);
    });
});

router.get('/:id',async function(req, res) {
    await dishesServ.GetDishes(req.params.id).then(function(results) {
        res.json(results);
    });
});

router.post('/',async function(req, res) {
    delete req.body._id;
    await dishesServ.AddDishes(req.body).then(function(results) {
        res.json(results);
    });
});

router.put('/',async function(req, res) {
    await dishesServ.EditDishes(req.body).then(function(results) {
        res.json(results);
    });
});

router.delete('/:id',async function(req, res) {
    await dishesServ.DeleteDishes(req.params.id).then(function(results) {
        res.json(results);
    });
});

module.exports = router;
