const router = require('express').Router();
const { Student } = require('../../models');

//using async/await in order to keep javascript running while routes are being use instead of possibility of javascript pausing for .then() functions

//get data from all students in the database /api/students GET
router.get('/', async (req, res) => {
    //using try / catch blocks in server routes to avoid errors breaking code
  try {
    //find all students in the database and return that info in json format
    const studentsData = await Student.findAll();
    res.status(200).json(studentsData);
  } catch (err) {
    //throw 500 error and send error in json format to help debug bad request
    res.status(500).json(err);
  }
});

//get data for single student from database by using that students id from request params /api/students/:id GET
router.get('/:id', async (req, res) => {
  try {
    const studentData = await Student.findByPk(req.params.id);
    //if there is no data for the requested student, show 404 error with message
    if (!studentData) {
      res.status(404).json({ message: 'No student found with this id!' });
      return;
    }
    //else respond with data of the requested student
    res.status(200).json(studentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// add a new student to the database /api/students POST
router.post('/', async (req, res) => {
  try {
    // req will have the following body { name: address: principal: budget: }
    const studentData = await Student.create(req.body);
    //if the student is successfully created then respond with that student data in json format
    res.status(200).json(studentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update data for single student from database by using that students id from request params /api/students/:id PUT
router.put('/:id', async (req, res) => {
  try {
    const studentData = await Student.update({
      // these are the fields we are allowing the user to update, currently it is every field
      name: req.body.name,
      grade: req.body.grade,
      teacher_id: req.body.teacher_id,
    },
    {
      where: {
        // only update the student that matches the id from the params
        id: req.params.id,
      },
    });
    //if there is no data for the requested student, show 404 error with message
    if (!studentData) {
      res.status(404).json({ message: 'No student found with this id!' });
      return;
    }
    //else respond with data of the requested student
    res.status(200).json({ message: 'Student successfully updated!'});
  } catch (err) {
    res.status(500).json(err);
  }
});

// remove a student from the database using a specific students ID /api/students/:id
router.delete('/:id', async (req, res) => {
  try {
    const studentData = await Student.destroy({
        // our WHERE will ensure that only the student with a matching ID from the req params will be deleted
      where: {
        id: req.params.id,
      },
    });
    // if there is no student found in the database with the ID in the params respond with a 404 and a message
    if (!studentData) {
      res.status(404).json({ message: 'No student found with this id!' });
      return;
    }
    // if the student is deleted then respond with a message 
    res.status(200).json({ message: 'Student successfully deleted!'});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
