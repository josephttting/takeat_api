'use strict';

const express = require('express');
const router = express.Router();

const UserService = require('../services/UserService');
const userServ = new UserService();

router.get('/',async function(req, res) {
    await userServ.ListUser().then(function(results) {
        res.json(results);
    });
});

router.get('/:id',async function(req, res) {
    await userServ.GetUser(req.params.id).then(function(results) {
        res.json(results);
    });
});

router.post('/',async function(req, res) {
    delete req.body._id;
    await userServ.AddUser(req.body).then(function(results) {
        res.json(results);
    });
});

router.put('/',async function(req, res) {
    await userServ.EditUser(req.body).then(function(results) {
        res.json(results);
    });
});

router.delete('/:id',async function(req, res) {
    await userServ.DeleteUser(req.params.id).then(function(results) {
        res.json(results);
    });
});

module.exports = router;
