const Assignments = require("../model/assignments");

exports.create = (req, res) => {
  console.log("exports.create req.body", req.body);
  const assignment = new Assignments(req.body);
  assignment.save((err, assignment) => {
    if (err) {
      return res.status(500).json({ err });
    }
    res.json({
      assignment,
    });
  });
};

exports.get = (req, res) => {
  return res.json({'assignment': req.assignment});
};

exports.list = (req, res) => {
  try {
    Assignments.find()
      .exec()
      .then((data) => {
        console.log(data);
        res.status(200).json({'assignments': data});
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ err });
  }
};

exports.getByCourseId = (req, res) => {
  try {
    Assignments.find({courseId: req.params.courseId})
      .exec()
      .then((data) => {
        console.log(data);
        res.status(200).json({'assignments': data});
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ err });
  }
};

exports.update = (req, res) => {
  const assignment = req.assignment;
  assignment.title = req.body.title;
  assignment.description = req.body.description;

  assignment.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "not updated",
      });
    }
    res.json(data);
  });
};

exports.patch = (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  
  try {
    Assignments.findByIdAndUpdate(id, updates, {new: true})
      .exec()
      .then((data) => {
        console.log(data);
        res.status(200).json({'assignments': data});
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ err });
  }
}

/* template for query param ( update mask)
exports.patch = (req, res) => {
  // const id = req.params.id;
  // const updates = req.body;
  const assignment = req.assignment;

  console.log('req ' + JSON.stringify(req.query))
  updateMask && updateMask.map((item) => {
    if(item === TITLE) assignment.title = req.body.title
    else if(item === INSTRUCTIONS_FIELD) assignment.description = req.body.description
  })

  assignment.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "patch not successful",
      });
    }
    console.log(data)
    res.json(data);
  });
*/

// since we are using remove as delete is an inbuit word for javascript

exports.remove = (req, res) => {
  const assignment = req.assignment;
  assignment.remove((err) => {
    if (err) {
      return res.status(400).json({
        error: "assignment could not be deleted",
      });
    }
    res.json({
      message: "Assignments deleted",
    });
  });
};

exports.assignmentById = (req, res, next, id) => {
  Assignments.findById(id).exec((err, assignment) => {
    if (err || !assignment) {
      return res.status(400).json({
        error: "assignment does not exist",
      });
    }
    req.assignment = assignment;
    next();
  });
};
