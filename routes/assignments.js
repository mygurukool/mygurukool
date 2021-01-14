const express = require('express')
const router = express.Router()

const { create, get, list, update, remove, assignmentById, getByCourseId} = require('../controller/assignments')

// router.get('/', (req, res) => {
//     res.send('Hello')
// })
router.get('/assignments/:assignmentId', get)
router.get('/assignments/courseId/:courseId', getByCourseId)
router.get('/assignments', list)
router.post('/assignments', create) // teacher access
router.put('/assignments/:assignmentId', update)// teacher access
router.delete('/assignments/:assignmentId', remove)// teacher access

router.param('assignmentId', assignmentById)

module.exports = router;