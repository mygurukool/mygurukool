const express = require('express')
const router = express.Router()

const { create, get, list, update, remove, assignmentById, getByCourseId, patch} = require('../controller/assignments')

// router.get('/', (req, res) => {
//     res.send('Hello')
// })
router.get('/assignments/:id', get)
router.get('/assignments/courseId/:courseId', getByCourseId)
router.get('/assignments', list)
router.post('/assignments/courseId/:courseId', create) // teacher access
router.put('/assignments/:id', update)// teacher access
router.delete('/assignments/:id', remove)// teacher access
router.patch('/assignments/:id', patch)// teacher access

router.param('id', assignmentById)

module.exports = router;