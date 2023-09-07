const express = require('express');
const { encrypt, decrypt } = require('../security/encyptor');
const router = express.Router();


module.exports = (client) => { 

        router.post('/account/register', (req, res, next) => {
            let data = JSON.parse(decrypt(req.body))
            let registerData = { data } 

            console.log(data.username)
            
        })
        router.post('/account/login', (req, res, next) => {
        });

    return router; 
};
