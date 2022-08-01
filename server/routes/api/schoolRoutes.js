const router = require('express').Router();
const { School, Teacher, Student } = require('../../models');

//using async/await in order to keep javascript running while routes are being use instead of possibility of javascript pausing for .then() functions

//get data from all schools in the database /api/schools GET
router.get('/', async (req, res) => {
    //using try / catch blocks in server routes to avoid errors breaking code
  try {
    //find all schools in the database and return that info in json format
    const schoolsData = await School.findAll();
    res.status(200).json(schoolsData);
  } catch (err) {
    //throw 500 error and send error in json format to help debug bad request
    res.status(500).json(err);
  }
});

//get data for single school from database by using that schools id from request params /api/schools/:id GET
router.get('/:id', async (req, res) => {
  try {
    const schoolData = await School.findByPk(req.params.id, {
      // also show any Teacher data associated with the school
      include: [{ model: Teacher }],
    });
    //if there is no data for the requested school, show 404 error with message
    if (!schoolData) {
      res.status(404).json({ message: 'No school found with this id!' });
      return;
    }
    //else respond with data of the requested school
    res.status(200).json(schoolData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// add a new school to the database /api/schools POST
router.post('/', async (req, res) => {
  try {
    // req will have the following body { name: address: principal: budget: }
    const schoolData = await School.create(req.body);
    //if the school is successfully created then respond with that school data in json format
    res.status(200).json(schoolData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update data for single school from database by using that schools id from request params /api/schools/:id PUT
router.put('/updateSchool', async (req, res) => {
  try {
    const schoolData = await School.update({
      // these are the fields we are allowing the user to update, currently it is only the principal and budget as the name and address of the school are not likely to change that frequently
      principal: req.body.principal,
      budget: req.body.budget,
    },
    {
      where: {
        // only update the school that matches the id from the params
        id: req.body.id,
      },
    });
    //if there is no data for the requested school, show 404 error with message
    if (!schoolData) {
      res.status(404).json({ message: 'No school found with this id!' });
      return;
    }
    //else respond with data of the requested school
    res.status(200).json({ message: 'School successfully updated!'});
  } catch (err) {
    res.status(500).json(err);
  }
});

// remove a school from the database using a specific schools ID /api/schools/deleteSchool
router.delete('/deleteSchool', async (req, res) => {
  console.log(req.body)
  try {
    const schoolData = await School.destroy({
        // our WHERE will ensure that only the school with a matching ID from the req params will be deleted
      where: {
        id: req.body.id,
      },
    });
    // if there is no school found in the database with the ID in the params respond with a 404 and a message
    if (!schoolData) {
      res.status(404).json({ message: 'No school found with this id!' });
      return;
    }
    // if the school is deleted then respond with a message 
    res.status(200).json({ message: 'School successfully deleted!'});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
