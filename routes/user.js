const express = require("express");
const router = express.Router();

const AuthController = require('../controller/AuthController')
const Organization = require('../controller/organizationController')


router.post('/login',AuthController.Login);
router.post('/registration',AuthController.Registration);

//organization 
router.post('/organization/create/',Organization.Create);

module.exports = router;
