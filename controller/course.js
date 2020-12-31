const Course = require('../model/course')

exports.courseById = (req,res, next, id) => {
    Course.findById(id).exec((err, course) => {
        if(err || !course) {
            return res.status(400).json({
                error: 'course does not exist'
            })
        }
        req.course = course;
        next();
    })
    
}


exports.create = (req, res) => {
    // console.log('req.body', req.body)
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

exports.get = (req, res) => {
    return res.json(req.course)
}

exports.update = (req, res) => {
    const course = req.course
    course.id = req.body.id
    course.name = req.body.name
    course.section = req.body.section
    course.descriptionHeading = req.body.descriptionHeading
    course.description = req.body.description
    course.room = req.body.room
    course.ownerId = req.body.ownerId
    course.creationTime = req.body.creationTime
    course.updateTime = req.body.updateTime

    course.save((err, data) => {
        if(err) {
            return res.status(400).json({
                error: 'not updated'
            })
        }
        res.json(data)
    })

}

// since we are using remove as delete is an inbuit word for javascript

exports.remove = (req, res) => {
    const course = req.course
    course.remove((err, data) => {
        if(err) {
            return res.status(400).json({
                error: 'course could not be deleted'
            })
        }
        res.json({
            message: 'Course deleted'
        })
    })

}