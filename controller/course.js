const Course = require('../model/course')

exports.test1 = (req, res) => {
    console.log('req.body', req.body)
    const course = new Course(req.body)
    course.save((err, course) => {
        if(err) {
            return res.status(400).json({
                error
            })
        }

        res.json({
            course
        })
    })
}