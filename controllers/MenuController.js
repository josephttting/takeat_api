'use strict';

const express = require('express');
const router = express.Router();

const MenuService = require('../services/MenuService');
const menuServ = new MenuService();

router.get('/list/:restaurantID', async function(req, res) {
    await menuServ.ListMenu(req.params.restaurantID).then(function(results) {
        res.json(results);
    });
});

router.get('/:id', async function(req, res) {
    await menuServ.GetMenu(req.params.id).then(function(results) {
        res.json(results);
    });
});

router.post('/',async function(req, res) {
    await menuServ.AddMenu(req.body).then(function(results) {
        res.json(results);
    });
});

router.put('/',async function(req, res) {
    await menuServ.EditMenu(req.body).then(function(results) {
        res.json(results);
    });
});

router.delete('/:id',async function(req, res) {
    await menuServ.DeleteMenu(req.params.id).then(function(results) {
        res.json(results);
    });
});

module.exports = router;
