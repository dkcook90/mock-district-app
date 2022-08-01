//bring in the Router method from the express library
const router = require('express').Router();
//the following variables are allowing express to access the specified js files to use the routes depending on the specified endpoint
const schoolRoutes = require('./schoolRoutes')
const teacherRoutes = require('./teacherRoutes')
const studentRoutes = require('./studentRoutes')
const userRoutes = require('./userRoutes')

//if the endpoint is /api/schools use the schoolRoutes js file and etc.
router.use('/schools', schoolRoutes)
router.use('/teachers', teacherRoutes)
router.use('/students', studentRoutes)
router.use('/users', userRoutes)

module.exports = router;