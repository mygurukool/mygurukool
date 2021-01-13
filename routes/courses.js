const express = require('express')
const router = express.Router()

const { create, courseById, get, list, update, remove} = require('../controller/courses')

// router.get('/', (req, res) => {
//     res.send('Hello')
// })
router.get('/courses/:courseId', get)
router.get('/courses', list)
router.post('/courses', create) // teacher access
router.put('/courses/:courseId', update)// teacher access
router.delete('/courses/:courseId', remove)// teacher access


router.param('courseId', courseById)

module.exports = router;