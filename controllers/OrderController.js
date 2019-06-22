'use strict';

const express = require('express');
const router = express.Router();

const OrderService = require('../services/OrderService');
const orderServ = new OrderService();

router.get('/user/:user_id',async function(req, res) {
    await orderServ.ListOrderByUser(req.params.user_id).then(function(results) {
        res.json(results);
    });
});

router.get('/',async function(req, res) {
    await orderServ.ListOrder(restaurantID).then(function(results) {
        res.json(results);
    });
});

router.get('/:id',async function(req, res) {
    await orderServ.GetOrder(req.params.id).then(function(results) {
        res.json(results);
    });
});

router.post('/',async function(req, res) {
    delete req.body._id;
    await orderServ.AddOrder(req.body).then(function(results) {
        res.json(results);
    });
});

router.put('/',async function(req, res) {
    await orderServ.EditOrder(req.body).then(function(results) {
        res.json(results);
    });
});

router.delete('/:id',async function(req, res) {
    await orderServ.DeleteOrder(req.params.id).then(function(results) {
        res.json(results);
    });
});

module.exports = router;
