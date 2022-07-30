const router = require("express").Router();
const { Teacher, Student } = require("../../models");

//using async/await in order to keep javascript running while routes are being use instead of possibility of javascript pausing for .then() functions

//get data from all teachers in the database /api/teachers GET
router.get("/", async (req, res) => {
    //using try / catch blocks in server routes to avoid errors breaking code
  try {
    //find all teachers in the database and return that info in json format
    const teachersData = await Teacher.findAll();
    res.status(200).json(teachersData);
  } catch (err) {
    //throw 500 error and send error in json format to help debug bad request
    res.status(500).json(err);
  }
});

//get data for single teacher from database by using that teachers id from request params /api/teachers/:id GET
router.get("/:id", async (req, res) => {
  try {
    const teacherData = await Teacher.findByPk(req.params.id, {
      // also show any Teacher data associated with the teacher
      include: [{ model: Student}],
    });
    //if there is no data for the requested teacher, show 404 error with message
    if (!teacherData) {
      res.status(404).json({ message: "No teacher found with this id!" });
      return;
    }
    //else respond with data of the requested teacher
    res.status(200).json(teacherData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// add a new teacher to the database /api/teachers POST
router.post("/", async (req, res) => {
  try {
    // req will have the following body { name: address: principal: budget: }
    const teacherData = await Teacher.create(req.body);
    //if the teacher is successfully created then respond with that teacher data in json format
    res.status(200).json(teacherData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update data for single teacher from database by using that teachers id from request params /api/teachers/:id PUT
router.put('/:id', async (req, res) => {
  try {
    const teacherData = await Teacher.update({
      // these are the fields we are allowing the user to update, currently it is only subject and school ID as the name of the teacher is not likely to change that frequently
      subject: req.body.subject,
      school_id: req.body.school_id,
    },
    {
      where: {
        // only update the teacher that matches the id from the params
        id: req.params.id,
      },
    });
    //if there is no data for the requested teacher, show 404 error with message
    if (!teacherData) {
      res.status(404).json({ message: 'No teacher found with this id!' });
      return;
    }
    //else respond with data of the requested teacher
    res.status(200).json({ message: 'Teacher successfully updated!'});
  } catch (err) {
    res.status(500).json(err);
  }
});

// remove a teacher from the database using a specific teachers ID /api/teachers/:id
router.delete("/:id", async (req, res) => {
  try {
    const teacherData = await Teacher.destroy({
        // our WHERE will ensure that only the teacher with a matching ID from the req params will be deleted
      where: {
        id: req.params.id,
      },
    });
    // if there is no teacher found in the database with the ID in the params respond with a 404 and a message
    if (!teacherData) {
      res.status(404).json({ message: "No teacher found with this id!" });
      return;
    }
    // if the teacher is deleted then respond with a message 
    res.status(200).json({ message: 'Teacher successfully deleted'});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
