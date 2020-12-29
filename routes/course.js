const express = require('express')
const router = express.Router()

const { test1 } = require('../controller/course')

router.post('/course1', test1)

module.exports = router;