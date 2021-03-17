const express = require('express');

const controllers = require('../controllers/users');
const middlewares = require('../middlewares');

const users = express.Router();

users.put('/edit', middlewares.authToken, controllers.profile);
users.post('/register', controllers.register);
users.get('/admin/profile', middlewares.authToken, controllers.adminProfile);

module.exports = users;
