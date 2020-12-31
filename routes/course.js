const express = require('express')
const router = express.Router()

const { create, courseById, get, update, remove} = require('../controller/course')

router.get('/courses/:courseId', get)
router.post('/courses', create) // teacher access
router.put('/courses/:courseId', update)// teacher access
router.delete('/courses/:courseId', remove)// teacher access


router.param('courseId', courseById)

module.exports = router;