const express = require("express");
const router = express.Router();

const AuthController = require('../controller/AuthController');
const Organization = require('../controller/organizationController');
const teacherController = require('../controller/teacherController');

const {isLogin} = require('../utils/utils')


router.post('/login',AuthController.Login);
router.post('/registration',AuthController.Registration);

//organization 
router.post('/teacher/create/',isLogin, teacherController.Create);
router.get('/teacher/teachersList/',isLogin, teacherController.GetTeachers);

router.post('/organization/create/',Organization.Create);

module.exports = router;
