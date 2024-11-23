const express = require('express');
// routes to setup our routes
const routes = express.Router();
const { verifyAccessToken } = require('../helpers/jwtHelper');
const authController = require('../controllers/authController');


// add a user (REGISTER) to the DB
routes.post('/register' , authController.addUser);

// login a user
routes.post('/loginUser', authController.loginUser);

// get all users
routes.get("/getAllUsers", authController.getAllUsers)


module.exports = routes;