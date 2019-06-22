'use strict';
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config');
const UserService = require('../services/UserService');
const userServ = new UserService();

router.post('/',async function(req, res) {
    await userServ.ValidateUser(req.body).then(async function(result) {
        if(result[0]) {
            let token = jwt.sign(result[1], config.jwt_secret, { expiresIn: '1h' });
            res.json(
                {
                    "User": result[1],
                    "message": "Login success",
                    "token": token
                }
            );
        }
        else {
            res.json({ "message": "Login fail" })
        }
    });
});

module.exports = router;